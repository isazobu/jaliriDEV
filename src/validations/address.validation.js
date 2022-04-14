const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAddress = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    title: Joi.string().required(),
    addressText: Joi.string().required(),
    addressType: Joi.string(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    area: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

const getAddresses = {
  query: Joi.object().keys({
    fullName: Joi.string(),
    title: Joi.string(),

    country: Joi.string(),
    city: Joi.string(),
    phone: Joi.string(),
    user: Joi.string().custom(objectId),
    email: Joi.string().email(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().custom(objectId),
  }),
};
const getAddressByTitle = {
  params: Joi.object().keys({
    addressTitle: Joi.string().required(),
  }),
};

const updateAddress = {
  params: Joi.object().keys({
    addressId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      fullName: Joi.string(),
      title: Joi.string(),
      addressText: Joi.string(),
      addressType: Joi.string(),
      country: Joi.string(),
      city: Joi.string(),
      area: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
    })
    .min(1),
};

const deleteAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createAddress,
  getAddresses,
  getAddress,
  getAddressByTitle,
  updateAddress,
  deleteAddress,
};
