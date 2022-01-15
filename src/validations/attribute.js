
    const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAttribute = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const getAttributes = {
  query: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getAttribute = {
  params: Joi.object().keys({
    attributeId: Joi.string().custom(objectId),
  }),
};
const getAttributeByTitle = {
  params: Joi.object().keys({
    attributeTitle: Joi.string().required(),
  }),
};

const updateAttribute = {
  params: Joi.object().keys({
    attributeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteAttribute = {
  params: Joi.object().keys({
    attributeId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createAttribute,
  getAttributes,
  getAttribute,
  updateAttribute,
  deleteAttribute,
  getAttributeByTitle,
};
