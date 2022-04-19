const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { addressService } = require('../services');

const createAddress = catchAsync(async (req, res) => {
  req.body.user = req.user.id; // address.user auto
  const address = await addressService.createAddress(req.user._id, req.body);
  res.status(httpStatus.CREATED).send(address);
});

// get me address
const getAddresses = catchAsync(async (req, res) => {
  const addresses = await addressService.getAddresses(req.user.addresses);
  res.status(httpStatus.OK).send(addresses);
});

const getAddressByTitle = catchAsync(async (req, res) => {
  const { addresses } = req.user;
  const address = await addressService.getAddressByTitle(addresses, req.params.addressTitle);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  res.status(httpStatus.OK).send(address);
});

const getAddressById = catchAsync(async (req, res) => {
  const { addresses } = req.user;
  const address = await addressService.getAddressById(addresses, req.params.addressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  res.status(httpStatus.OK).send(address);
});

const updateAddress = catchAsync(async (req, res) => {
  const address = await addressService.updateAddressByUserId(req.user._id, req.body, req.params.addressId);
  res.send(address);
});

const deleteAddress = catchAsync(async (req, res) => {
  await addressService.deleteAddressById(req.params.addressId, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAddress,
  getAddresses,
  getAddressByTitle,
  getAddressById,
  updateAddress,
  deleteAddress,
};
