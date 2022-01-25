const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { addressService } = require('../services');

const createAddress = catchAsync(async (req, res) => {
  req.body.user = req.user.id; // address.user auto
  const address = await addressService.createAddress(req.body);
  res.status(httpStatus.CREATED).send(address);
});

const getAddresses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullName', 'title', 'country', 'city', 'phone', 'user', 'email']);
  const options = pick(req.query, ['sortBy', 'limit']);
  const result = await addressService.queryAddresses(filter, options);
  res.status(httpStatus.OK).send(result);
});

// get me address
const getMeAddress = catchAsync(async (req, res) => {
  const address = await addressService.getMeAddress(req.user.id);
  res.status(httpStatus.OK).send(address);
});

const getAddress = catchAsync(async (req, res) => {
  const address = await addressService.getAddressById(req.params.addressId, req.user.id);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  res.status(httpStatus.OK).send(address);
});

const getAddressByTitle = catchAsync(async (req, res) => {
  const address = await addressService.getAddressByTitle(req.params.addressTitle);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  res.status(httpStatus.OK).send(address);
});

const updateAddress = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const address = await addressService.updateAddressById(req.params.addressId, req.body);
  res.send(address);
});

const deleteAddress = catchAsync(async (req, res) => {
  await addressService.deleteAddressById(req.params.addressId, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAddress,
  getAddresses,
  getAddress,
  getMeAddress,
  getAddressByTitle,
  updateAddress,
  deleteAddress,
};
