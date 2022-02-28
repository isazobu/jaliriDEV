const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBanner = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    category: Joi.string().custom(objectId),
    image: Joi.string().required(),
    field: Joi.string().required(),
    target: Joi.string().required(),
    row: Joi.number().required(),
    isActive: Joi.boolean(),
  }),
};

const getBanners = {
  query: Joi.object().keys({
    title: Joi.string(),
    url: Joi.string(),
    image: Joi.string(),
    field: Joi.string(),
    target: Joi.string(),
    category: Joi.string().custom(objectId),
    row: Joi.number(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getBanner = {
  params: Joi.object().keys({
    bannerId: Joi.string().custom(objectId),
  }),
};
const getBannerByTitle = {
  params: Joi.object().keys({
    bannerTitle: Joi.string().required(),
  }),
};

const updateBanner = {
  params: Joi.object().keys({
    bannerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      url: Joi.string(),
      image: Joi.string(),
      field: Joi.string(),
      target: Joi.string(),
      row: Joi.number(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteBanner = {
  params: Joi.object().keys({
    bannerId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createBanner,
  getBanners,
  getBanner,
  updateBanner,
  deleteBanner,
  getBannerByTitle,
};
