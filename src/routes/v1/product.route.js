// ! TODO: ADD SWAGGER FOR PRODUCT
const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').get(productController.getProducts).post(auth('manageProducts'), productController.createProduct);

router
  .route('/:productId')
  .get(productController.getProduct)
  .patch(auth('manageProducts'), productController.updateProduct)
  .delete(auth('manageProducts'), productController.deleteProduct);

module.exports = router;
