const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWarehouse = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const getWarehouses = {
  query: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getWarehouse = {
  params: Joi.object().keys({
    warehouseId: Joi.string().custom(objectId),
  }),
};
const getWarehouseByTitle = {
  params: Joi.object().keys({
    warehouseTitle: Joi.string().required(),
  }),
};

const updateWarehouse = {
  params: Joi.object().keys({
    warehouseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteWarehouse = {
  params: Joi.object().keys({
    warehouseId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createWarehouse,
  getWarehouses,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseByTitle,
};
