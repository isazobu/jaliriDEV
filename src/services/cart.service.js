/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const { User, Variant } = require('../models');
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
  const variants = await Variant.find({ sku: skus }).populate('product', 'title brand');
  if (variants.length !== skus.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
  }

  variants.forEach((variant) => {
    addItem(user.cart.items, variant, items.find((item) => item.sku === variant.sku).quantity);
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
  if (!variant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
  }

  if (!user.cart) {
    user.cart = newCart();
  }

  const { items } = user.cart;

  switch (action) {
    case 'insert':
      addItem(items, variant, quantity);
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

  if (!user.cart || user.cart.items.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart is empty');
  }

  const { items } = user.cart;

  const data = await Promise.all(
    items.map(async (item) => {
      const variant = await Variant.findOne({ sku: item.sku });
      if (!variant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
      }
      return {
        sku: variant.sku,
        hasStock: variant.hasStock,
        totalStock: variant.totalStock,
      };
    })
  );

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

function addItem(items, variant, quantity) {
  const indexFound = items.findIndex((item) => item.sku === variant.sku);
  const { _id, title, brand } = variant.product;
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
      product: _id,
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
