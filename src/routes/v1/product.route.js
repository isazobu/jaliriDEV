// ! TODO: ADD SWAGGER FOR PRODUCT
const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').get(productController.getProducts).post(auth('manageProducts'), productController.createProduct);

router.route('/sku/:skuId').get(productController.getProductBySku);
router.route('/variants/:skuId').get(productController.getVariants);
router.route('/sku/:skuId/sizes').get(productController.getAllSizeByColorWithSku);
router.route('/many').post(auth('manageProducts'), productController.createManyProducts);

router
  .route('/:productId')
  .get(productController.getProduct)
  .patch(auth('manageProducts'), productController.updateProduct)
  .delete(auth('manageProducts'), productController.deleteProduct);

module.exports = router;
