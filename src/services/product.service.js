const httpStatus = require('http-status');
const { Product, Attribute, Category, Country } = require('../models');
const ApiError = require('../utils/ApiError');
const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
/**
 * Create a user
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const newA = async (attribute, list) => {
  let newAttribute = new Attribute(attribute);
  const x = await Attribute.findOne({ name: newAttribute.name, value: newAttribute.value });
  if (x) {
    list.push(x._id);
  } else {
    newAttribute = await newAttribute.save();
    list.push(newAttribute._id);
  }
};

const createProduct = async (productBody) => {
  const { variants, ...product } = productBody;

  const tempAttr = variants.attributes;
  variants.attributes = [];
  const attributesId = catchAsync(
    tempAttr.map(async (attribute) => {
      return newA(attribute, variants.attributes);
    })
  );

  const productCountry = await Country.getCountryByCode(product.country);

  if (productCountry) {
    product.country = productCountry._id;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Country not found');
  }
  const productCategory = await Category.findOne({ title: product.category });
  if (productCategory) {
    product.category = productCategory._id;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
  }

  return Product.create({ ...product, variants });
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
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id).populate('category', '-isActive -image').populate('attr');
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
