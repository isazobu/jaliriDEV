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
  .post(auth('me'), validate(addressValidation.createAddress), addressController.createAddress);

router.get(
  '/title/:addressTitle',
  auth(),
  validate(addressValidation.getAddressByTitle),
  addressController.getAddressByTitle
);

router
  .route('/:addressId')
  .get(auth('me'), validate(addressValidation.getAddressById), addressController.getAddressById)
  .patch(auth('me'), validate(addressValidation.updateAddress), addressController.updateAddress)
  .delete(auth('me'), validate(addressValidation.deleteAddress), addressController.deleteAddress);

module.exports = router;
