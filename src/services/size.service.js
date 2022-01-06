const httpStatus = require('http-status');
const { Size } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a size
 * @param {Object} sizeBody
 * @returns {Promise<Size>}
 */
const createSize = async (sizeBody) => {
  if (await Size.isSizeExist(sizeBody.size)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Size already exist');
  }
  return Size.create(sizeBody);
};

/**
 * Query for Sizes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const getAllSizes = async () => {
  const sizes = await Size.find({});
  return sizes;
};

const getSizes = async () => {
  const sizes = await Size.find({});
  return sizes;
};

/**
 * Get size by id
 * @param {ObjectId} id
 * @returns {Promise<Size>}
 */
const getSizeById = async (sizeId) => {
  return Size.findById(sizeId);
};

/**
 * Get size by value
 * @param {string} size
 * @returns {Promise<Size>}
 */
const getSizeByTitle = async (size) => {
  return Size.findOne({ size });
};

/**
 * Update size by id
 * @param {ObjectId} sizeId
 * @param {Object} updateBody
 * @returns {Promise<Size>}
 */

const updateSizeById = async (sizeId, updateBody) => {
  const size = await getSizeById(sizeId);
  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }
  if (updateBody.size && (await Size.isSizeExist(updateBody.size))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Size already taken');
  }
  Object.assign(size, updateBody);
  await size.save();
  return size;
};

/**
 * Delete size by id
 * @param {ObjectId} sizeId
 * @returns {Promise<Size>}
 */
const deleteSizeById = async (sizeId) => {
  const size = await getSizeById(sizeId);
  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }
  await size.remove();
  return size;
};

module.exports = {
  createSize,
  getAllSizes,
  getSizes,
  getSizeById,
  getSizeByTitle,
  updateSizeById,
  deleteSizeById,
};
