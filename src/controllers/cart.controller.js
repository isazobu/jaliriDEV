const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');
const pick = require('../utils/pick');

const getCart = catchAsync(async (req, res) => {
  const params = pick(req.query, ['detail']);
  const cart = await cartService.getCartByUserId('61f111c1d3479a163c065838', params);
  res.status(httpStatus.OK).send(cart);
});

const addToCart = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;
  const response = await cartService.addToCart(userId, productId);
  res.status(httpStatus.CREATED).send(response);
});

const deleteFromCart = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;
  const response = await cartService.deleteFromCart(userId, productId);
  res.status(httpStatus.NO_CONTENT).send(response);
});

const updateCart = catchAsync(async (req, res) => {
  const { userId, items } = req.body;
  const response = await cartService.updateCart(userId, items);
  res.status(httpStatus.NO_CONTENT).send(response);
});

module.exports = {
  getCart,
  addToCart,
  deleteFromCart,
  updateCart,
};
