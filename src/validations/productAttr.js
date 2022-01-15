const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProductAttr = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const getProductAttrs = {
  query: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getProductAttr = {
  params: Joi.object().keys({
    productAttrId: Joi.string().custom(objectId),
  }),
};
const getProductAttrByTitle = {
  params: Joi.object().keys({
    productAttrTitle: Joi.string().required(),
  }),
};

const updateProductAttr = {
  params: Joi.object().keys({
    productAttrId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteProductAttr = {
  params: Joi.object().keys({
    productAttrId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createProductAttr,
  getProductAttrs,
  getProductAttr,
  updateProductAttr,
  deleteProductAttr,
  getProductAttrByTitle,
};
