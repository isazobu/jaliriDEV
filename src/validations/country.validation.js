const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCountry = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    currency: Joi.string().required(),
    rightToLeft: Joi.boolean(),
    currencySymbol: Joi.string().required(),
  }),
};

const getCountries = {
  query: Joi.object().keys({
    name: Joi.string(),
    code: Joi.string(),
    rightToLeft: Joi.boolean(),
    currency: Joi.string(),
    currencySymbol: Joi.string(),
    sortBy: Joi.string(),
    flagImage: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getCountry = {
  params: Joi.object().keys({
    countryId: Joi.string().custom(objectId),
  }),
};
const getCountryByCode = {
  params: Joi.object().keys({
    code: Joi.string().required(),
  }),
};

const updateCountry = {
  params: Joi.object().keys({
    countryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      code: Joi.string(),
      currency: Joi.string(),
      rightToLeft: Joi.boolean(),
      flagImage: Joi.string(),
      currencySymbol: Joi.string(),
    })
    .min(1),
};

const deleteCountry = {
  params: Joi.object().keys({
    countryId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createCountry,
  getCountries,
  getCountry,
  updateCountry,
  deleteCountry,
  getCountryByCode,
};
