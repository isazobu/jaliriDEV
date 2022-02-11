const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getCart = {
  query: Joi.object().keys({
    detail: Joi.boolean(),
  }),
};

const addToCart = {
  body: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
    quantity: Joi.number().required(),
  }),
};

const manipulate = {
  body: Joi.object().keys({
    action: Joi.string().valid('insert', 'delete', 'truncate').required(),
    productId: Joi.string().custom(objectId).when('action', {
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
