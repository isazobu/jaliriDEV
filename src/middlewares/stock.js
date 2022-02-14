const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

module.exports.checkStock = () => (req, res, next) => {
  const { action, sku, quantity } = req.body;
  const items  = req.user.cart?.items;
  
  const quantityInCart = items?.find((item) => item.sku === sku)?.quantity || 0;

  if (action === 'truncate') return next();
  Product.findOne({'variants.sku': sku})
    .select('variants')
    .then((product) => {
      if (!product) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
      }
      const variant = product.variants.find((item) => item.sku === sku);
      if (action === 'insert' && variant.totalStock < quantity + quantityInCart) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock');
      }
      if (action === 'delete' && quantityInCart - quantity < 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock');
      }

      next();
    })
    .catch(next);
};

module.exports.checkStockForOrder = () => (req, res, next) => {
  if (!req.user.cart || req.user.cart.items.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cart is empty');
  }
  const { items } = req.user.cart;
  const skus = items.map((item) => item.sku);
  Product.find({
    'variants.sku': { $in: skus },
  })
    .select('variants')
    .then((products) => {
      products.forEach((product) => {
        items.forEach((cartItem) => {
          const variant = product.variants.find((item) => item.sku === cartItem.sku);
        if (variant.totalStock < cartItem.quantity) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock');
        }
        });
      });
      next();
    })
    .catch(next);
};
