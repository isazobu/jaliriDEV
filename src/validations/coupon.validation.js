const Joi = require('joi');

const createCoupon = {
  body: Joi.object().keys({
    code: Joi.string().required().uppercase().trim(),
    title: Joi.string().required(),
    type: Joi.string().required().valid('percentage', 'amount', 'freeShipping'),
    value: Joi.number().when('type', {
      not: 'freeShipping',
      then: Joi.required(),
    }),
    isActive: Joi.boolean().default(true),
    countryCode: Joi.string().required(),
    specification: Joi.string().valid('category', 'product', 'brand', 'variant', 'all').default('all'),
    specificationId: Joi.string().when('specification', {
      not: 'all',
      then: Joi.required(),
    }),
    minCartAmount: Joi.number(),
    minQuantity: Joi.number(),
    maxRedeem: Joi.number().default(null),
    timesRedeemed: Joi.number().default(0),
    startDate: Joi.date().iso().default(new Date()),
    expireDate: Joi.date()
      .iso()
      .default(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days expiration by default
      .greater(Joi.ref('startDate')),
  }),
};

const getCoupons = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    sortBy: Joi.string(),
    search: Joi.string(),
    title: Joi.string(),
    type: Joi.string(),
    countryCode: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const updateCoupon = {
  body: Joi.object().keys({
    code: Joi.string().uppercase(),
    title: Joi.string(),
    type: Joi.string().valid('percentage', 'amount', 'freeShipping'),
    value: Joi.number().when('type', {
      not: 'freeShipping',
      then: Joi.required(),
    }),
    isActive: Joi.boolean(),
    countryCode: Joi.string(),
    specification: Joi.string().valid('category', 'product', 'brand', 'variant', 'all'),
    specificationId: Joi.string().when('specification', {
      not: 'all',
      then: Joi.required(),
    }),
    minCartAmount: Joi.number(),
    minQuantity: Joi.number(),
    maxRedeem: Joi.number(),
    timesRedeemed: Joi.number(),
    startDate: Joi.date().iso().default(new Date()),
    expireDate: Joi.date().iso().greater(Joi.ref('startDate')),
  }),
};

module.exports = { createCoupon, getCoupons, updateCoupon };
