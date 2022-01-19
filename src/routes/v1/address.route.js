//! ADD SWAGGER DOCUMENTATİON FOR ADDRESS

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const addressValidation = require('../../validations/address.validation');
const addressController = require('../../controllers/address.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('manageAddresses'), validate(addressValidation.getAddresses), addressController.getAddresses)
  .post(auth('me'), validate(addressValidation.createAddress), addressController.createAddress);

router.route('title/:addressTitle').get(validate(addressValidation.getAddressByTitle), addressController.getAddressByTitle);

// me address
router.route('/me').get(auth('me'), addressController.getMeAddress);

router
  .route('/:addressId')
  .get(validate(addressValidation.getAddress), addressController.getAddress)
  .patch(auth('manageAddresses'), validate(addressValidation.updateAddress), addressController.updateAddress)
  .delete(auth('manageAddresses'), validate(addressValidation.deleteAddress), addressController.deleteAddress);

module.exports = router;
