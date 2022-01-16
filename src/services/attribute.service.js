const { Attribute } = require('../models');

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Create a attribute
 * @param {Object} attributeBody
 * @returns {Promise<Attribute>}
 */
const createAttribute = async (attributeBody) => {
  if (await Attribute.isAttributeExist(attributeBody.name, attributeBody.value)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Attribute already exist');
  }
  return Attribute.create(attributeBody);
};

const createOrReadAttribute = async (attributeBody) => {
  const attribute = await Attribute.findOne({ name: attributeBody.name, value: attributeBody.value });
  if (attribute) {
    return attribute;
  }
  return Attribute.create(attributeBody);
};

/**
 * Query for Attributes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryAttributes = async (filter, options) => {
  const attributes = await Attribute.paginate(filter, options);
  return attributes;
};

/**
 * Get attribute by id
 * @param {ObjectId} id
 * @returns {Promise<Attribute>}
 */
const getAttributeById = async (attributeId) => {
  return Attribute.findById(attributeId);
};

/**
 * Get attribute by name
 * @param {string} title
 * @returns {Promise<Attribute>}
 */
const getAttributeByCouple = async (name, value) => {
  return Attribute.findOne({ name, value });
};

/**
 * Update attribute by id
 * @param {ObjectId} attributeId
 * @param {Object} updateBody
 * @returns {Promise<Attribute>}
 */

const updateAttributeById = async (attributeId, updateBody) => {
  const attribute = await getAttributeById(attributeId);
  if (!attribute) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  }
  if (updateBody.title && (await Attribute.isAttributeExist(updateBody.title, attributeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Attribute already taken');
  }
  Object.assign(attribute, updateBody);
  await attribute.save();
  return attribute;
};

/**
 * Delete attribute by id
 * @param {ObjectId} attributeId
 * @returns {Promise<Attribute>}
 */
const deleteAttributeById = async (attributeId) => {
  const attribute = await getAttributeById(attributeId);
  if (!attribute) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  }
  await attribute.remove();
  return attribute;
};

module.exports = {
  createAttribute,
  queryAttributes,
  getAttributeById,
  getAttributeByCouple,
  updateAttributeById,
  deleteAttributeById,
  createOrReadAttribute,
};
