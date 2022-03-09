const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addToWishlist = {
  headers: Joi.object().keys({
    country: Joi.string().required().uppercase(),
  }),
  body: Joi.object().keys({
    product: Joi.string().required().custom(objectId),
  }),
};

const removeFromWishlist = {
  headers: Joi.object().keys({
    country: Joi.string().required().uppercase(),
  }),
  body: Joi.object().keys({
    product: Joi.string().required().custom(objectId),
  }),
};

const getMyWishlist = {
  headers: Joi.object().keys({
    country: Joi.string().uppercase().required(),
  }),
};

const getWishlists = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    country: Joi.string(),
    products: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
  getWishlists,
};
