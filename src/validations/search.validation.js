const Joi = require('joi');

const search = {
  query: Joi.object().keys({
    key: Joi.string().required(),
  }),
};

module.exports = {
  search,
};
