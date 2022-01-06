const httpStatus = require('http-status');
const { Color } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a color
 * @param {Object} colorBody
 * @returns {Promise<Color>}
 */
const createColor = async (colorBody) => {
  if (await Color.isHexColorCodeExist(colorBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Color already exist');
  }
  return Color.create(colorBody);
};

/**
 * Query for Colors
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryColors = async (filter, options) => {
  const colors = await Color.paginate(filter, options);
  return colors;
};

const getColors = async () => {
  const colors = await Color.find({});
  return colors;
};

/**
 * Get color by id
 * @param {ObjectId} id
 * @returns {Promise<Color>}
 */
const getColorById = async (colorId) => {
  return Color.findById(colorId);
};

/**
 * Get color by name
 * @param {string} name
 * @returns {Promise<Color>}
 */
const getColorByTitle = async (name) => {
  return Color.findOne({ name });
};

/**
 * Update color by id
 * @param {ObjectId} colorId
 * @param {Object} updateBody
 * @returns {Promise<Color>}
 */

const updateColorById = async (colorId, updateBody) => {
  const color = await getColorById(colorId);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  if (updateBody.hexColorCode && (await Color.isHexColorCodeExist(updateBody.hexColorCode))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Color already taken');
  }
  Object.assign(color, updateBody);
  await color.save();
  return color;
};

/**
 * Delete color by id
 * @param {ObjectId} colorId
 * @returns {Promise<Color>}
 */
const deleteColorById = async (colorId) => {
  const color = await getColorById(colorId);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  await color.remove();
  return color;
};

module.exports = {
  createColor,
  queryColors,
  getColors,
  getColorById,
  getColorByTitle,
  updateColorById,
  deleteColorById,
};
