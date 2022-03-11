const httpStatus = require('http-status');
const { Product, Variant } = require('../models');
const ApiError = require('../utils/ApiError');

const manipulate = (req, res, next) => {
  const { action, sku, quantity } = req.body;
  const items = req.user.cart?.items;

  const quantityInCart = items?.find((item) => item.sku === sku)?.quantity || 0;

  if (action === 'truncate') return next();
  Variant.findOne({ sku })
    .select('totalStock')
    .then((variant) => {
      if (!variant) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Variant not found');
      }
      if (action === 'insert' && variant.totalStock < quantity + quantityInCart) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock');
      }

      next();
    })
    .catch(next);
};

const createOrder = (req, res, next) => {
  if (!req.user.cart || req.user.cart.items.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cart is empty');
  }
  const { items } = req.user.cart;
  const skus = items.map((item) => item.sku);
  Variant.find({
    sku: { $in: skus },
  })
    .select('sku totalStock')
    .then((variants) => {
      variants.forEach((variant) => {
        const cartItem = items.find((item) => item.sku === variant.sku);
        if (variant.totalStock < cartItem.quantity) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock for item: ' + cartItem.sku);
        }
      });
      next();
    })
    .catch(next);
};

const addToCart = (req, res, next) => {
  const { items } = req.body;

  const itemsInCart = req.user.cart?.items;
  const skus = items.map((item) => item.sku);

  Variant.find({
    sku: { $in: skus },
  })
    .select('totalStock')
    .then((variants) => {
      variants.forEach((variant) => {
        const itemToAdd = items.find((item) => item.sku === variant.sku);
        const quantityInCart = itemsInCart?.find((cartItem) => cartItem.sku === itemToAdd.sku)?.quantity || 0;
        if (variant.totalStock < itemToAdd.quantity + quantityInCart) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock for item: ' + itemToAdd.sku);
        }
      });
      next();
    })
    .catch(next);
};

module.exports = {
  manipulate,
  createOrder,
  addToCart,
};
