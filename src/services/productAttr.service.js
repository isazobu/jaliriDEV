const httpStatus = require('http-status');
const { ProductAttr } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a productAttr
 * @param {Object} productAttrBody
 * @returns {Promise<ProductAttr>}
 */
const createProductAttr = async (productAttrBody) => {
  if (await ProductAttr.isProductAttrExist(productAttrBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ProductAttr already exist');
  }
  return ProductAttr.create(productAttrBody);
};

/**
 * Query for ProductAttrs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryProductAttrs = async (filter, options) => {
  const productAttrs = await ProductAttr.paginate(filter, options);
  return productAttrs;
};

/**
 * Get productAttr by id
 * @param {ObjectId} id
 * @returns {Promise<ProductAttr>}
 */
const getProductAttrById = async (productAttrId) => {
  return ProductAttr.findById(productAttrId);
};

/**
 * Get productAttr by name
 * @param {string} title
 * @returns {Promise<ProductAttr>}
 */
const getProductAttrByTitle = async (title) => {
  return ProductAttr.findOne({ title });
};

/**
 * Update productAttr by id
 * @param {ObjectId} productAttrId
 * @param {Object} updateBody
 * @returns {Promise<ProductAttr>}
 */

const updateProductAttrById = async (productAttrId, updateBody) => {
  const productAttr = await getProductAttrById(productAttrId);
  if (!productAttr) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductAttr not found');
  }
  if (updateBody.title && (await ProductAttr.isProductAttrExist(updateBody.title, productAttrId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ProductAttr already taken');
  }
  Object.assign(productAttr, updateBody);
  await productAttr.save();
  return productAttr;
};

/**
 * Delete productAttr by id
 * @param {ObjectId} productAttrId
 * @returns {Promise<ProductAttr>}
 */
const deleteProductAttrById = async (productAttrId) => {
  const productAttr = await getProductAttrById(productAttrId);
  if (!productAttr) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductAttr not found');
  }
  await productAttr.remove();
  return productAttr;
};

module.exports = {
  createProductAttr,
  queryProductAttrs,
  getProductAttrById,
  getProductAttrByTitle,
  updateProductAttrById,
  deleteProductAttrById,
};
