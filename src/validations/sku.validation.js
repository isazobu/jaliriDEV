const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createSku = {
  body: Joi.object().keys({
    sku: Joi.string().required(),
    barcode: Joi.string().required(),
    name: Joi.string().required(),
    color: Joi.string().custom(objectId).required(),
    size: Joi.string().custom(objectId).required(),
    price: Joi.string().custom(objectId).required(),
    image: Joi.array().items(Joi.string()).required(),
    freeShipping: Joi.boolean().required(),
    discountExist: Joi.boolean().required(),
    discount: Joi.number(),
    quantity: Joi.number().required(),
    country: Joi.string().custom(objectId).required(),
  }),
};

const getSkus = {
  query: Joi.object().keys({
    sku: Joi.string(),
    barcode: Joi.string(),
    name: Joi.string(),
    color: Joi.object().keys({
      _id: Joi.string().custom(objectId),
      name: Joi.string(),
      hexColorCode: Joi.string(),
    }),
    size: Joi.object().keys({
      _id: Joi.string().custom(objectId),
      size: Joi.string(),
    }),
    price: Joi.object().keys({
      _id: Joi.string().custom(objectId),
      sellingPrice: Joi.object().keys({
        value: Joi.number(),
        text: Joi.string(),
      }),
      currency: Joi.string(),
      discountedPrice: Joi.object().keys({
        value: Joi.number(),
        text: Joi.string(),
      }),
      totalPrice: Joi.object().keys({
        value: Joi.number(),
        text: Joi.string(),
      }),
      cargoPrice: Joi.object().keys({
        value: Joi.number(),
        text: Joi.string(),
      }),
      installmentPrice: Joi.number(),
    }),
    image: Joi.array().items(Joi.string()),
    freeShipping: Joi.boolean(),
    discountExist: Joi.boolean(),
    discount: Joi.number(),
    quantity: Joi.number(),
    country: Joi.object().keys({
      _id: Joi.string().custom(objectId),
      name: Joi.string(),
      code: Joi.string(),
      currency: Joi.string(),
      currencySymbol: Joi.string(),
    }),

    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSku = {
  params: Joi.object().keys({
    skuId: Joi.string(),
  }),
};

const updateSku = {
  params: Joi.object().keys({
    sku: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      sku: Joi.string(),
      barcode: Joi.string(),
      name: Joi.string(),
      color: Joi.object().keys({
        _id: Joi.string().custom(objectId),
        name: Joi.string(),
        hexColorCode: Joi.string(),
      }),
      size: Joi.object().keys({
        _id: Joi.string().custom(objectId),
        size: Joi.string(),
      }),
      price: Joi.object().keys({
        _id: Joi.string().custom(objectId),
        sellingPrice: Joi.object().keys({
          value: Joi.number(),
          text: Joi.string(),
        }),
        currency: Joi.string(),
        discountedPrice: Joi.object().keys({
          value: Joi.number(),
          text: Joi.string(),
        }),
        totalPrice: Joi.object().keys({
          value: Joi.number(),
          text: Joi.string(),
        }),
        cargoPrice: Joi.object().keys({
          value: Joi.number(),
          text: Joi.string(),
        }),
        installmentPrice: Joi.number(),
      }),
      image: Joi.array().items(Joi.string()),
      freeShipping: Joi.boolean(),
      discountExist: Joi.boolean(),
      discount: Joi.number(),
      quantity: Joi.number(),
      country: Joi.object().keys({
        _id: Joi.string().custom(objectId),
        name: Joi.string(),
        code: Joi.string(),
        currency: Joi.string(),
        currencySymbol: Joi.string(),
      }),
    })
    .min(1),
};

const deleteSku = {
  params: Joi.object().keys({
    sku: Joi.string().required(),
  }),
};

module.exports = {
  createSku,
  getSkus,
  getSku,
  updateSku,
  deleteSku,
};
