const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createColor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    hexColorCode: Joi.string(),
  }),
};

const getColors = {
  query: Joi.object().keys({
    name: Joi.string(),
    hexColorCode: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
  }),
};

const getColor = {
  params: Joi.object().keys({
    colorId: Joi.string().custom(objectId),
  }),
};
const getColorByTitle = {
  params: Joi.object().keys({
    colorName: Joi.string().required(),
  }),
};

const updateColor = {
  params: Joi.object().keys({
    colorId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      hexColorCode: Joi.string(),
    })
    .min(1),
};

const deleteColor = {
  params: Joi.object().keys({
    colorId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createColor,
  getColors,
  getColor,
  updateColor,
  deleteColor,
  getColorByTitle,
};
