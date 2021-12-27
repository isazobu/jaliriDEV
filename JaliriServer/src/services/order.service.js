const httpStatus = require('http-status');
const { Order, OrderItem, Address } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  const { orderItems, address, ...order } = orderBody;
  const orderItemsIds = orderItems.map((orderItem) => {
    const newOrderItem = this.createOrReadOrderItem(orderItem);
    return newOrderItem._id;
  });
  const addressId = this.createOrReadAdress(address);
  return Order.create({ orderItems: orderItemsIds, address: addressId, ...order });
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
  if (updateBody.title && (await Order.isOrderExist(updateBody.title, orderId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order already taken');
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

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  createOrReadAdress,
  createOrReadOrderItem,
  updateOrderById,
  deleteOrderById,
};
