const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getCart = {
  query: Joi.object().keys({
    detail: Joi.boolean(),
  }),
};

const addToCart = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
    quantity: Joi.number().required(),
  }),
};

const deleteFromCart = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const decreaseQuantity = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const increaseQuantity = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getCart,
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  increaseQuantity,
};
