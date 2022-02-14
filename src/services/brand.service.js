const { Brand } = require('../models');

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Create a brand
 * @param {Object} brandBody
 * @returns {Promise<Brand>}
 */
const createBrand = async (brandBody) => {
  if (await Brand.isBrandExist(brandBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand already exist');
  }
  return Brand.create(brandBody);
};

/**
 * Query for Brands
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryBrands = async (filter, options) => {
  const brands = await Brand.paginate(filter, options);
  return brands;
};

/**
 * Get brand by id
 * @param {ObjectId} id
 * @returns {Promise<Brand>}
 */
const getBrandById = async (brandId) => {
  return Brand.findById(brandId);
};

/**
 * Get brand by name
 * @param {string} title
 * @returns {Promise<Brand>}
 */
const getBrandBySlug = async (slug) => {
  return Brand.findOne({ slug });
  // SELECT * from Brand where slug=req.params.name limit 1
};

/**
 * Update brand by id
 * @param {ObjectId} brandId
 * @param {Object} updateBody
 * @returns {Promise<Brand>}
 */

const updateBrandBySlug = async (brandSlug, updateBody) => {
  const brand = await getBrandBySlug(brandSlug);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  if (updateBody.name && (await Brand.isBrandExist(updateBody.name, brandSlug))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Brand already taken');
  }
  Object.assign(brand, updateBody);
  await brand.save();
  return brand;
};

/**
 * Delete brand by id
 * @param {ObjectId} brandId
 * @returns {Promise<Brand>}
 */
const deleteBrandBySlug = async (brandSlug) => {
  const brand = await getBrandBySlug(brandSlug);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  await brand.remove();
  return brand;
};

module.exports = {
  createBrand,
  queryBrands,
  getBrandById,
  getBrandBySlug,
  updateBrandBySlug,
  deleteBrandBySlug,
};
