const Joi = require('joi');

const getCart = {
  query: Joi.object().keys({
    detail: Joi.boolean(),
  }),
};

const addToCart = {
  body: Joi.object().keys({
    items: Joi.array().items(
      Joi.object().keys({
        sku: Joi.string().required(),
        quantity: Joi.number().required().integer().min(1),
      })
    ),
  }),
};

const manipulate = {
  body: Joi.object().keys({
    action: Joi.string().valid('insert', 'delete', 'truncate').required(),
    sku: Joi.string().when('action', {
      not: 'truncate',
      then: Joi.required(),
    }),
    quantity: Joi.number()
      .integer()
      .when('action', {
        not: 'truncate',
        then: Joi.required(),
      })
      .when('action', {
        is: 'insert',
        then: Joi.number().min(1),
      })
      .when('action', {
        is: 'delete',
        then: Joi.number().min(-1).not(0),
      }),
  }),
};

module.exports = {
  getCart,
  addToCart,
  manipulate,
};
