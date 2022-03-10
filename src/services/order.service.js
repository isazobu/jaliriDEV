/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Order, OrderItem, Address, Product } = require('../models');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

// /**
//  * Create a order
//  * @param {Object} orderBody
//  * @returns {Promise<Order>}
//  */
// const createOrder = async (orderBody) => {
//   const { orderItems, address, ...order } = orderBody;
//   const orderItemsIds = orderItems.map((orderItem) => {
//     const newOrderItem = this.createOrReadOrderItem(orderItem);
//     return newOrderItem._id;
//   });
//   const addressId = this.createOrReadAdress(address);
//   return Order.create({ orderItems: orderItemsIds, address: addressId, ...order });
// };

/**
 * Create a order
 * @param {ObjectId} userId
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (userId, orderBody) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const address = await Address.findById(orderBody.address);
  if (!address || address.user.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Address not found');
  }
  const { addressId, ...other } = orderBody;

  //   const addressId = this.createOrReadAdress(address);

  let order = new Order({
    cart: newCart(),
    address: mongoose.Types.ObjectId(orderBody.addressId),
    user: mongoose.Types.ObjectId(userId),
    ...other,
  });

  Object.assign(order.cart, user.cart);

  const itemCount = order.cart.items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  order.message = `${itemCount} items pending for delivery`;
  order.summary = `${itemCount} items`;

  await Product.updateMany(
    { 'variants.sku': { $in: order.cart.items.map((item) => item.product) } },
    { $inc: { 'variants.$.totalStock': -order.cart.items.map((item) => item.quantity).reduce((a, b) => a + b, 0) } }
  );

  // await Product.updateMany(
  //   { _id: { $in: order.cart.items.map((item) => item.product) } },
  //   { $inc: { 'variants.totalStock': -order.cart.items.map((item) => item.quantity).reduce((a, b) => a + b, 0) } }
  // );
  order = order.save();

  user.cart = undefined;
  await user.save();

  return order;
};

const createOrReadOrderItem = async (orderItemBody) => {
  const orderItem = await OrderItem.find(orderItemBody);
  if (orderItem) return orderItem;
  return OrderItem.create(orderItemBody);
};

const createOrReadAdress = async (addressBody) => {
  const address = await Address.find(addressBody);
  if (address) return address;
  return Address.create(addressBody);
};

/**
 * Query for Orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (orderId) => {
  return Order.findById(orderId);
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

/**
 * Delete order of the user by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteMyOrderById = async (orderId, userId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (order.user.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  await order.remove();
  return order;
};

const newCart = () => {
  return {
    cart: [],
    totalPrice: 0,
    itemsPrice: 0,
    shippingPrice: 0,
  };
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  createOrReadAdress,
  createOrReadOrderItem,
  updateOrderById,
  deleteOrderById,
  deleteMyOrderById,
};
