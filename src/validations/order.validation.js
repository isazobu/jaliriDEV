const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getOrders = {
  query: Joi.object().keys({
    status: Joi.string().valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    isPaid: Joi.boolean(),
    user: Joi.string().custom(objectId),
    address: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer().min(1).default(10),
    page: Joi.number().integer().min(1).default(1),
  }),
};

const createOrder = {
  body: Joi.object().keys({
    address: Joi.string().custom(objectId).required(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const getMeOrders = {
  query: Joi.object().keys({
    status: Joi.string().valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    isPaid: Joi.boolean(),
    address: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer().min(1).default(10),
    page: Joi.number().integer().min(1).default(1),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    isPaid: Joi.boolean(),
    address: Joi.string().custom(objectId),
  }),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  getOrders,
  createOrder,
  getOrder,
  getMeOrders,
  updateOrder,
  deleteOrder,
};
