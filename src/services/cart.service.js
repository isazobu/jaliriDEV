/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const logger = require('../config/logger');
const { User, Product } = require('../models');
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
const addToCart = async (userId, products) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.cart) {
    user.cart = newCart();
  }

  for (let index = 0; index < products.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    const product = await Product.findById(products[index].productId).select('variants');
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    addItem(user.cart.items, product, products[index].quantity);
  }

  calculateTotalPrice(user);

  logger.warn(user.cart);
  logger.warn(products[0].productId);
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
const manipulate = async (userId, action, productId, quantity) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let product;
  if (productId) {
    product = await Product.findById(productId).select('variants');
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
  }

  if (!user.cart) {
    user.cart = newCart();
  }

  const { items } = user.cart;

  switch (action) {
    case 'insert':
      addItem(items, product, quantity);
      break;
    case 'delete':
      deleteItem(items, product, quantity);
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
  const stock = await Product.find({
    _id: { $in: items.map((item) => item.product) },
  }).select('variants');

  return stock.map((product) => {
    return {
      product: product._id,
      hasStock: product.variants.hasStock,
      totalStock: product.variants.totalStock,
    };
  });
};

function deleteItem(items, product, quantity) {
  const indexFound = items.findIndex((item) => item.product.toString() === product._id.toString());
  const { price } = product.variants;
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

function addItem(items, product, quantity) {
  const indexFound = items.findIndex((item) => item.product.toString() === product._id.toString());
  const { price } = product.variants;
  if (indexFound > -1) {
    items[indexFound].quantity += quantity;
    items[indexFound].totalPrice += price.sellingPrice.value * quantity;
    items[indexFound].totalSalesPrice += price.discountExists
      ? price.discountedPrice.value * quantity
      : price.sellingPrice.value * quantity;
  } else {
    items.push({
      quantity,
      product: mongoose.Types.ObjectId(product._id),
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
