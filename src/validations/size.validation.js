const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSize = {
  body: Joi.object().keys({
    size: Joi.string().required(),
  }),
};

const getSizes = {
  query: Joi.object().keys({
    size: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
  }),
};

const getSize = {
  params: Joi.object().keys({
    sizeId: Joi.string().custom(objectId),
  }),
};
const getSizeByTitle = {
  params: Joi.object().keys({
    size: Joi.string(),
  }),
};

const updateSize = {
  params: Joi.object().keys({
    sizeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      size: Joi.string(),
    })
    .min(1),
};

const deleteSize = {
  params: Joi.object().keys({
    sizeId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createSize,
  getSizes,
  getSize,
  updateSize,
  deleteSize,
  getSizeByTitle,
};
