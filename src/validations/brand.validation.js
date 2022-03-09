const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBrand = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    isActive: Joi.boolean(),
  }),
};

const getBrands = {
  query: Joi.object().keys({
    name: Joi.string(),
    isActive: Joi.boolean(),
    slug: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBrandBySlug = {
  params: Joi.object().keys({
    categorySlug: Joi.string().required(),
  }),
};

const updateBrand = {
  params: Joi.object().keys({
    brandSlug: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteBrand = {
  params: Joi.object().keys({
    brandSlug: Joi.string().required(),
  }),
};
module.exports = {
  createBrand,
  getBrands,
  getBrandBySlug,
  updateBrand,
  deleteBrand,
};
