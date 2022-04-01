const Joi = require('joi');
const { objectId } = require('./custom.validation');

const price = Joi.object().keys({
  value: Joi.number().required(),
  text: Joi.string(),
});

const dimension = Joi.object().keys({
  width: Joi.number().min(0),
  height: Joi.number().min(0),
  depth: Joi.number().min(0),
});

const attribute = Joi.object().keys({
  name: Joi.string().required(),
  value: Joi.string().required(),
});

const createVariant = {
  body: Joi.object().keys({
    sku: Joi.string().required(),
    barcode: Joi.string().required(),
    product: Joi.string().custom(objectId).required(),
    attributes: Joi.array().items(attribute),
    kg: Joi.number().min(0),
    dimension,
    image: Joi.array().items(Joi.string()),
    hasVariants: Joi.boolean(),
    isActive: Joi.boolean(),
    price: Joi.object().keys({
      currency: Joi.string().required(),
      sellingPrice: price,
      discountExist: Joi.boolean(),
      discountedPrice: price,
      originalPrice: price,
      discountAmount: price,
      discountType: Joi.string().valid('percentage', 'none', 'fixed', 'free_shipping'),
      shippingPrice: price,
      totalPrice: price,
      installmentPrice: Joi.number(),
    }),
    freeShipping: Joi.boolean(),
    hasStock: Joi.boolean(),
    totalStock: Joi.number().min(0).required(),
  }),
};

const getVariantBySku = {
  params: Joi.object().keys({
    sku: Joi.string().required(),
  }),
};

const getVariantById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const getVariants = {
  query: Joi.object().keys({
    product: Joi.string().custom(objectId),
    sku: Joi.string(),
    barcode: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer().min(1),
  }),
};

const updateVariant = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    sku: Joi.string(),
    barcode: Joi.string(),
    product: Joi.string().custom(objectId),
    attributes: Joi.array().items(attribute),
    kg: Joi.number().min(0),
    dimension,
    image: Joi.array().items(Joi.string()),
    hasVariants: Joi.boolean(),
    isActive: Joi.boolean(),
    price: Joi.object().keys({
      currency: Joi.string().required(),
      sellingPrice: price,
      discountExist: Joi.boolean(),
      discountedPrice: price,
      originalPrice: price,
      discountAmount: price,
      discountType: Joi.string().valid('percentage', 'none', 'fixed', 'free_shipping'),
      shippingPrice: price,
      totalPrice: price,
      installmentPrice: Joi.number(),
    }),
    freeShipping: Joi.boolean(),
    hasStock: Joi.boolean(),
    totalStock: Joi.number().min(0).required(),
  }),
};

const deleteVariant = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.export = {
  createVariant,
  getVariantBySku,
  getVariantById,
  getVariants,
  updateVariant,
  deleteVariant,
};
