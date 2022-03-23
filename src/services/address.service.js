/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { Country, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a address
 * @param {Object} addressBody
 * @returns {Promise<Address>}
 */
const createAddress = async (userId, addressBody) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.addresses.some((address) => address.title === addressBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Address title already exists');
  }
  const country = await Country.getCountryByCode(addressBody.country);
  if (!country) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Country not found');
  }
  addressBody.country = country._id;
  user.addresses.push(addressBody);
  await user.save();
  return user.addresses.find((address) => address.title === addressBody.title);
};

/**
 * Get address by email
 * @param {string} title
 * @returns {Promise<Address>}
 */
const getAddressByTitle = async (addresses, title) => {
  return addresses.find((address) => address.title === title);
};

/**
 *
 * @param {Array} addresses
 * @param {ObjectId} id
 * @returns
 */
const getAddressById = async (addresses, id) => {
  return addresses.find((address) => address.id === id);
};

const getAddresses = async (addresses) => {
  return addresses;
};


/**
 * Update address by id
 * @param {ObjectId} userId
 * @param {ObjectId} addressId
 * @param {Object} updateBody
 * @returns {Promise<Address>}
 */
const updateAddressByUserId = async (userId, updateBody, addressId) => {
  const user = await User.findById(userId);
  const address = user.addresses.find((addr) => addr.id === addressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  Object.assign(address, updateBody);
  await user.save();
  return address;
};

/**
 * Delete address by id
 * @param {ObjectId} addressId
 * @returns {Promise<Address>}
 */
const deleteAddressById = async (addressId, userId) => {
  const user = await User.findById(userId);
  const address = user.addresses.find((addr) => addr.id === addressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  user.addresses = user.addresses.filter((addr) => addr.id !== addressId);
  await user.save();
  return address;
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  getAddressByTitle,
  updateAddressByUserId,
  deleteAddressById,
};
