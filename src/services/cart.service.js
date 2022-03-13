/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const { User, Product, Variant } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {ObjectId} userId
 * @param {Object} params
 * @returns {Promise<Cart>}
 */
const getCartByUserId = async (userId, params) => {
  let user;
  if (params.detail === true)
    user = await User.findById(userId).populate({ path: 'cart.items.product', model: 'Product' }).select('cart');
  else user = await User.findById(userId).select('cart');

  if (!user.cart) {
    user.cart = newCart();
  }
  return user.cart;
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} productId
 * @param {Number} quantity
 * @returns {Promise<Cart>}
 */
const addToCart = async (userId, items) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.cart) {
    user.cart = newCart();
  }

  const skus = items.map((item) => item.sku);

  const products = await Product.find({ 'variants.sku': { $in: skus } }).select('variants title brand');
  if (!products) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  products.forEach((product) => {
    items.forEach((item) => {
      const variant = product.variants.find((v) => v.sku === item.sku);
      addItem(user.cart.items, variant, item.quantity, product._id, product.title, product.brand);
    });
  });

  calculateTotalPrice(user);

  user.markModified('cart');
  user = await user.save();

  return user.cart;
};

/**
 *
 * @param {ObjectId} userId
 * @param {Enum} action
 * @param {ObjectId} productId
 * @param {Number} quantity
 * @returns {Promise<Cart>}
 */
const manipulate = async (userId, action, sku, quantity) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const variant = await Variant.findOne({ sku }).populate('product', 'title brand');
  console.log(variant.product);
  if (!variant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
  }

  if (!user.cart) {
    user.cart = newCart();
  }

  const { items } = user.cart;
  const { _id, title, brand } = variant.product;

  switch (action) {
    case 'insert':
      addItem(items, variant, quantity, _id, title, brand);
      break;
    case 'delete':
      deleteItem(items, variant, quantity);
      break;
    case 'truncate':
      items.splice(0, items.length);
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid action');
  }

  calculateTotalPrice(user);
  user.markModified('cart');
  user = await user.save();
  return user.cart;
};

const getCartStock = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }

  const { items } = user.cart;
  const skus = items.map((item) => item.sku);
  const stock = await Product.find({
    'variants.sku': { $in: skus },
  }).select('variants');

  if (!stock) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const data = stock
    .map((product) => {
      return product.variants
        .filter((item) => skus.includes(item.sku))
        .map((variant) => {
          return {
            sku: variant.sku,
            hasStock: variant.hasStock,
            totalStock: variant.totalStock,
          };
        });
    })
    .flat();

  return { items: data };
};

function deleteItem(items, variant, quantity) {
  const indexFound = items.findIndex((item) => item.sku === variant.sku);
  const { price } = variant;
  if (indexFound > -1) {
    if (quantity === -1 || items[indexFound].quantity === quantity) {
      items.splice(indexFound, 1);
    } else {
      if (items[indexFound].quantity < quantity)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Quantity can not be less than zero');
      items[indexFound].quantity -= quantity;
      items[indexFound].totalPrice -= price.sellingPrice.value * quantity;
      items[indexFound].totalSalesPrice -= price.discountExists
        ? price.discountedPrice.value * quantity
        : price.sellingPrice.value * quantity;
    }
  } else throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
}

function addItem(items, variant, quantity, productId, title, brand) {
  const indexFound = items.findIndex((item) => item.sku === variant.sku);
  const { price } = variant;
  if (indexFound > -1) {
    items[indexFound].quantity += quantity;
    items[indexFound].totalPrice += price.sellingPrice.value * quantity;
    items[indexFound].totalSalesPrice += price.discountExists
      ? price.discountedPrice.value * quantity
      : price.sellingPrice.value * quantity;
  } else {
    items.push({
      quantity,
      sku: variant.sku,
      product: productId,
      brand,
      title,
      images: [...variant.image],
      totalDiscount: price.discountAmount.value * quantity,
      totalPrice: price.sellingPrice.value * quantity,
      // eslint-disable-next-line prettier/prettier
      totalSalesPrice: price.discountExists ? price.discountedPrice.value * quantity : price.sellingPrice.value * quantity,
    });
  }
}

function calculateTotalPrice(user) {
  if (user.cart.items.length > 0) {
    user.cart.itemsPrice = user.cart.items.map((item) => item.totalPrice).reduce((acc, next) => acc + next);
    user.cart.totalPrice = user.cart.itemsPrice + user.cart.shippingPrice;
  } else {
    user.cart = newCart();
  }
}

const newCart = () => {
  return {
    cart: [],
    totalPrice: 0,
    itemsPrice: 0,
    shippingPrice: 0,
  };
};

module.exports = {
  getCartByUserId,
  addToCart,
  manipulate,
  getCartStock,
};
