const Joi = require('joi');
// const { objectId } = require('./custom.validation');
// const attrProduct = require('../config/attrProduct');

const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().max(200),
    tags: Joi.string(),
    isVariants: Joi.boolean(),
    brand: Joi.string().required(),
    // prices: Joi.object().keys({
    //   country: Joi.string().required(),
    //   price: Joi.number().required(),
    //   currency: Joi.string().required(),
    // }),
    // attr: Joi.object().keys({
    //   item: Joi.string().custom(objectId),
    //   size: Joi.string().valid(attrProduct.SIZES),
    //   color: Joi.string().valid(attrProduct.COLORS),
    //   stock: Joi.number().required(),
    //   price: Joi.number().required,
    // }),
    // image: Joi.string(),
    // isActive: Joi.boolean(),
    // discountExist: Joi.boolean(),
    // discountPercent: Joi.number(),
    // discountPrice: Joi.number(),
    // freeShipping: Joi.boolean(),
    // hasStock: Joi.boolean(),
    // totalStock: Joi.number().required(),
    // category: Joi.object().keys({
    //   // ! categoryId ? _id ?
    //   categoryId: Joi.string().custom(objectId),
    //   title: Joi.string().required(),
    //   images: Joi.string(),
    //   isActive: Joi.boolean(),
    // }),
    // subCategory: Joi.string(),
  }),
};

module.exports = {
  createProduct,
};
