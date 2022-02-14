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
  const { items } = req.body;
  const response = await cartService.addToCart(_id, items);
  res.status(httpStatus.CREATED).send(response);
});

const manipulate = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { action, sku, quantity } = req.body;
  const response = await cartService.manipulate(_id, action, sku, quantity);
  res.status(httpStatus.OK).send(response);
});

const getCartStock = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const response = await cartService.getCartStock(_id);
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  getCart,
  addToCart,
  manipulate,
  getCartStock,
};
