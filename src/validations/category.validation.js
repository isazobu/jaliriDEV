const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    parentId: Joi.string().custom(objectId),
    subCategories: Joi.array().items(Joi.string().custom(objectId)),
    image: Joi.string(),
    mainCategory: Joi.boolean(),
    isActive: Joi.boolean(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string(),
    parentId: Joi.string().custom(objectId),
    subCategories: Joi.array().items(Joi.string().custom(objectId)),
    isActive: Joi.boolean(),
    mainCategory: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    populate: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const getCategoryBySlug = {
  params: Joi.object().keys({
    categorySlug: Joi.string().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string(),
      isActive: Joi.boolean(),
      mainCategory: Joi.boolean(),
      parentId: Joi.string().custom(objectId),
      subCategories: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
};
