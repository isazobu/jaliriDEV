const express = require('express');
const auth = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(cartController.getCart)
  .post(cartController.addToCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteFromCart);

module.exports = router;
