const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');
const pick = require('../utils/pick');

const getCart = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const params = pick(req.query, ['detail']);
  const cart = await cartService.getCartByUserId(_id, params);
  res.status(httpStatus.OK).send(cart);
});

const addToCart = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId, quantity } = req.body;
  const response = await cartService.addToCart(_id, productId, quantity);
  res.status(httpStatus.CREATED).send(response);
});

const decreaseQuantity = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  const response = await cartService.decreaseQuantity(_id, productId);
  res.status(httpStatus.OK).send(response);
});

const increaseQuantity = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  const response = await cartService.increaseQuantity(_id, productId);
  res.status(httpStatus.OK).send(response);
});

const deleteFromCart = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  const response = await cartService.deleteFromCart(_id, productId);
  res.status(httpStatus.NO_CONTENT).send(response);
});

const updateCart = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { items } = req.body;
  const response = await cartService.updateCart(_id, items);
  res.status(httpStatus.NO_CONTENT).send(response);
});

module.exports = {
  getCart,
  addToCart,
  deleteFromCart,
  updateCart,
  decreaseQuantity,
  increaseQuantity,
};
