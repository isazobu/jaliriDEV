const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

module.exports.checkStock = () => (req, res, next) => {
  const { action, productId, quantity } = req.body;
  const { items } = req.user.cart;
  if (action === 'truncate') return next();
  Product.findById(productId)
    .select('variants')
    .then((product) => {
      if (
        product.variants.totalStock <
        quantity + items.find((e) => e.product.toString() === productId.toString()).quantity
      ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock');
      }
      next();
    })
    .catch(next);
};

module.exports.checkStockForOrder = () => (req, res, next) => {
  const { items } = req.user.cart;
  const productIds = items.map((item) => item.product);
  Product.find({
    _id: { $in: productIds },
  })
    .select('variants')
    .then((products) => {
      products.forEach((product) => {
        const item = items.find((e) => e.product.toString() === product._id.toString());
        if (product.variants.totalStock < item.quantity) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough stock');
        }
      });
      next();
    })
    .catch(next);
};
