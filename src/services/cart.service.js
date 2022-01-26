const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { User, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const getCartByUserId = async (userId, params) => {
  let user;
  if (params.detail === 'true')
    user = await User.findById(userId).populate({ path: 'cart.items.product', model: 'Product' }).select('cart');
  else user = await User.findById(userId).select('cart');
  return user.cart;
};

const addToCart = async (userId, productId) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if (!user.cart) {
    user.cart = {
      totalPrice: 0,
      itemsPrice: 0,
      shippingPrice: 0,
    };
  }
  const indexFound = user.cart.items.findIndex((item) => item.product.toString() === productId);

  if (indexFound > -1) {
    user.cart.items[indexFound].quantity += 1;
    user.cart.items[indexFound].totalPrice += product.variants.price.sellingPrice.value;
    user.cart.items[indexFound].totalSalesprice += product.variants.price.sellingPrice.value;
  } else {
    user.cart.items.push({
      quantity: 1,
      product: mongoose.Types.ObjectId(productId),
      totalDiscount: 0,
      totalPrice: product.variants.price.sellingPrice.value,
      totalSalesprice: 10,
    });
  }
  user.cart.itemsPrice = user.cart.items.map((item) => item.totalPrice).reduce((acc, next) => acc + next);
  user.markModified('cart');
  user = await user.save();

  return user.cart;
};

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
  else
    user.cart = {
      totalPrice: 0,
      itemsPrice: 0,
      shippingPrice: 0,
    };
  user.markModified('cart');
  user = await user.save();

  return user.cart;
};

const updateCart = async (userId, items) => {
  let user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  console.log(user.cart.items);

  Object.assign(user.cart.items, items);
  console.log(user.cart.items);

  if (user.cart.items.length > 0){
    user.cart.itemsPrice = user.cart.items.map((item) => item.totalPrice * item.quantity).reduce((acc, next) => acc + next);
    console.log(user.cart.itemsPrice);
  }
  else
    user.cart = {
      totalPrice: 0,
      itemsPrice: 0,
      shippingPrice: 0,
    };
  user.markModified('cart');
  user = await user.save();

  return user.cart;
};

module.exports = {
  getCartByUserId,
  addToCart,
  deleteFromCart,
  updateCart,
};
