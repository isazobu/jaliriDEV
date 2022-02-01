/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const mongoose = require('mongoose');
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
const addToCart = async (userId, productId, quantity) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const product = await Product.findById(productId).select('variants');
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if (!user.cart) {
    user.cart = newCart();
  }
  const indexFound = user.cart.items.findIndex((item) => item.product.toString() === productId);

  if (indexFound > -1) {
    user.cart.items[indexFound].quantity += quantity;
    user.cart.items[indexFound].totalPrice += product.variants.price.sellingPrice.value * quantity;
    user.cart.items[indexFound].totalSalesPrice += product.variants.price.sellingPrice.value * quantity;
  } else {
    user.cart.items.push({
      quantity,
      product: mongoose.Types.ObjectId(productId),
      totalDiscount: 0,
      totalPrice: product.variants.price.sellingPrice.value * quantity,
      totalSalesPrice: 10,
    });
  }
  user.cart.itemsPrice = user.cart.items.map((item) => item.totalPrice).reduce((acc, next) => acc + next);
  user.cart.totalPrice = user.cart.itemsPrice + user.cart.shippingPrice;
  user.markModified('cart');
  user = await user.save();

  return user.cart;
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} productId
 * @returns {Promise<Cart>}
 */
const decreaseQuantity = async (userId, productId) => {
  if (!(await User.exists({ _id: userId }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const product = await Product.findById(productId).select('variants');
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const user = await handleItem(userId, product, false);
  return user.cart;
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} productId
 * @returns {Promise<Cart>}
 */
const increaseQuantity = async (userId, productId) => {
  if (!(await User.exists({ _id: userId }))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const product = await Product.findById(productId).select('variants');
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const user = await handleItem(userId, product, true);
  return user.cart;
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} productId
 * @returns {Promise<Cart>}
 */
const deleteFromCart = async (userId, productId) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const indexFound = user.cart.items.findIndex((item) => item.product.toString() === productId);

  if (indexFound > -1) {
    user.cart.items.splice(indexFound, 1);
  } else throw new ApiError(httpStatus.NOT_FOUND, 'Product not found in Cart');

  if (user.cart.items.length > 0)
    user.cart.itemsPrice = user.cart.items.map((item) => item.totalPrice).reduce((acc, next) => acc + next);
  else user.cart = newCart();

  user.markModified('cart');
  user = await user.save();
  return user.cart;
};

/**
 *
 * @param {ObjectId} userId
 * @param {Object} product
 * @param {Boolean} isNew - Increase or decrease
 * @returns {Promise<User>}
 */
async function handleItem(userId, product, isNew) {
  const user = await User.findById(userId);
  const indexFound = user.cart.items.findIndex((item) => item.product.toString() === product._id.toString());

  if (indexFound > -1) {
    if (isNew) {
      user.cart.items[indexFound].quantity += 1;
      user.cart.items[indexFound].totalPrice += product.variants.price.sellingPrice.value;
      user.cart.items[indexFound].totalSalesPrice += product.variants.price.sellingPrice.value;
    } else {
      if (user.cart.items[indexFound].quantity === 1) throw new ApiError(httpStatus.BAD_REQUEST, 'Quantity can not be zero');
      user.cart.items[indexFound].quantity -= 1;
      user.cart.items[indexFound].totalPrice -= product.variants.price.sellingPrice.value;
      user.cart.items[indexFound].totalSalesPrice -= product.variants.price.sellingPrice.value;
    }
  } else throw new ApiError(httpStatus.NOT_FOUND, 'Product not found in Cart');

  user.cart.itemsPrice = user.cart.items.map((item) => item.totalPrice).reduce((acc, next) => acc + next);
  user.markModified('cart');
  return user.save();
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
  deleteFromCart,
  decreaseQuantity,
  increaseQuantity,
};
