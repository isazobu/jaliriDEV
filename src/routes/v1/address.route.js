//! ADD SWAGGER DOCUMENTATİON FOR ADDRESS

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const addressValidation = require('../../validations/address.validation');
const addressController = require('../../controllers/address.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('me'), addressController.getAddresses)
  .post(auth('me'), validate(addressValidation.createAddress), addressController.createAddress)
  .patch(auth('me'), validate(addressValidation.updateAddress), addressController.updateAddress);

router.get('/title/:addressTitle', auth(), addressController.getAddressByTitle);

router
  .route('/:addressId')
  .get(auth('me'), addressController.getAddressById)
  .patch(auth(), addressController.updateAddress)
  .delete(auth(), addressController.deleteAddress);

module.exports = router;
