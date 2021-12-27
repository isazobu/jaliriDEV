const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Card is empty' });
  }
  const order = await orderService.createOrder(req.body);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit']);
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

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  getOrderByTitle,
  updateOrder,
  deleteOrder,
};
