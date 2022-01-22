const httpStatus = require('http-status');
const { query } = require('../config/logger');
const { Product, Category, Country } = require('../models');
const { toJSON } = require('../models/plugins');

const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */

const createProduct = async (productBody) => {
  const productCountry = await Country.getCountryByCode(productBody.country);

  if (productCountry) {
    productBody.country = productCountry._id;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Country not found');
  }
  const productCategory = await Category.findOne({ title: productBody.category });
  if (productCategory) {
    productBody.category = productCategory._id;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
  }

  return Product.create(productBody);
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */

const queryProducts = async (filter, options) => {
  const products = await Product.productFiltering(filter, options);
  //   return products;
  // };

  // if (filter.category) {
  //   criteria['category.title'] = filter.category;
  // }
  // if (filter.country) {
  //   criteria['country.code'] = filter.country;
  // }

  // const products = await Product.aggregate([
  //   {
  //     $lookup: {
  //       from: 'categories',
  //       localField: 'category',
  //       foreignField: '_id',
  //       as: 'category',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'countries',
  //       localField: 'country',
  //       foreignField: '_id',
  //       as: 'country',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'attributes',
  //       localField: 'variants.attributes',
  //       foreignField: '_id',
  //       as: 'variants.attributes',
  //     },
  //   },
  //   {
  //     $sort: {
  //       'variants.price.sellingPrice': 1,
  //     },
  //   },

  //   {
  //     $match: criteria,
  //   },
  // ])
  //   .sort('-variants.price.sellingPrice.value')
  //   .limit(options.limit)
  //   .skip(options.skip).;
  console.log(products);
  return products;
};

/**
 * Get user by id
 * @pararem {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  const product = await Product.findById(id).populate('category').populate('country');
  return product;
};

const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (updateBody.title && (await Product.isProductExist(updateBody.title))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already taken');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Address>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
