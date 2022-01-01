const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};
const getCategoryByTitle = {
  params: Joi.object().keys({
    categoryTitle: Joi.string().required(),
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
  getCategoryByTitle,
};
