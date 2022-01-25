const httpStatus = require('http-status');
const { Address } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a address
 * @param {Object} addressBody
 * @returns {Promise<Address>}
 */
const createAddress = async (addressBody) => {
  // if (!(await Address.isAddressExist(addressBody.title, addressBody.user))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Address title already exist');
  // }
  return Address.create(addressBody);
};

/**
 * Query for Addresses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryAddresses = async (filter, options) => {
  const addresses = await Address.paginate(filter, options);
  return addresses;
};

// me address
const getMeAddress = async (userId) => {
  const address = await Address.getMeAddress(userId);
  return address;
};

/**
 * Get address by id
 * @param {ObjectId} id
 * @returns {Promise<Address>}
 */
const getAddressByIdandMe = async (addressId, userId) => {
  const address = await Address.findById(addressId);

  if (address && address.user.toString() !== userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You can only operate your own address');
  }
  return address;
};

/**
 * Get address by email
 * @param {string} title
 * @returns {Promise<Address>}
 */
const getAddressByTitle = async (title) => {
  return Address.findOne({ title });
};

/**
 * Update address by id
 * @param {ObjectId} addressId
 * @param {Object} updateBody
 * @returns {Promise<Address>}
 */

const updateAddressById = async (addressId, updateBody) => {
  const address = await getAddressByIdandMe(addressId, updateBody.user.toString());

  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  // if (updateBody.title && (await Address.isAddressExist(updateBody.title, addressId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Address already taken');
  // }
  Object.assign(address, updateBody);
  await address.save();
  return address;
};

/**
 * Delete address by id
 * @param {ObjectId} addressId
 * @returns {Promise<Address>}
 */
const deleteAddressById = async (addressId, userId) => {
  const address = await getAddressByIdandMe(addressId, userId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  await address.remove();
  return address;
};

module.exports = {
  createAddress,
  getMeAddress,
  queryAddresses,
  getAddressById: getAddressByIdandMe,
  getAddressByTitle,
  updateAddressById,
  deleteAddressById,
};
