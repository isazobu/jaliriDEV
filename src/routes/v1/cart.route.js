const express = require('express');
const auth = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');
const validate = require('../../middlewares/validate');
const { cartValidation } = require('../../validations');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(auth('manageCarts'), validate(cartValidation.getCart), cartController.getCart)
  .post(auth('manageCarts'), validate(cartValidation.addToCart), cartController.addToCart)
  .patch(auth('manageCarts'), cartController.updateCart)
  .delete(auth('manageCarts'), validate(cartValidation.deleteFromCart), cartController.deleteFromCart);

router
  .post('/add', auth('manageCarts'), validate(cartValidation.increaseQuantity), cartController.increaseQuantity)
  .post('/remove', auth('manageCarts'), validate(cartValidation.decreaseQuantity), cartController.decreaseQuantity);

module.exports = router;
