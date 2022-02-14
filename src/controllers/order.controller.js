const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  if (!req.user.cart || req.user.cart.items.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cart is empty');
  }
  const order = await orderService.createOrder(req.user._id, req.body);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'isPaid', 'user', 'address']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getMeOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'isPaid', 'address']);
  filter.user = req.user._id;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.status(httpStatus.OK).send(order);
});

const getOrderByTitle = catchAsync(async (req, res) => {
  const order = await orderService.getOrderByTitle(req.params.orderTitle);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.status(httpStatus.OK).send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteMyOrder = catchAsync(async (req, res) => {
  await orderService.deleteMyOrderById(req.params.orderId, req.user._id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrder,
  getOrders,
  getMeOrders,
  getOrder,
  getOrderByTitle,
  updateOrder,
  deleteOrder,
  deleteMyOrder,
};
