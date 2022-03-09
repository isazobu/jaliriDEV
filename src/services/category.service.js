const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  let parentCategory;
  if (await Category.isCategoryExist(categoryBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category already exist');
  }

  if (categoryBody.parentId) {
    parentCategory = await getCategoryById(categoryBody.parentId);
    if (!parentCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Parent category not found');
    }
    if (parentCategory._id === categoryBody.parentId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Parent category cannot be itself');
    }
  }
  const category = await Category.create(categoryBody);

  if (parentCategory) {
    parentCategory?.subCategories.push(category._id);
    await parentCategory.save();
  }

  return category;
};

/**
 * Query for Categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (categoryId) => {
  return Category.findById(categoryId).populate('subCategories', 'slug title image').populate('parentId', 'slug title');
};

/**
 * Get category by slug
 * @param {string} Slug
 * @returns {Promise<Category>}
 */
const getCategoryBySlug = async (slug) => {
  return Category.findOne({ slug }).populate('subCategories', 'slug title image').populate('parentId', 'slug title');
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.title && (await Category.isCategoryExist(updateBody.title, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category already taken');
  }

  if (updateBody.parentId) {
    parentCategory = await getCategoryById(updateBody.parentId);
    if (!parentCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Parent category not found');
    }
    if (parentCategory._id === updateBody.parentId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Parent category cannot be itself');
    }
  }

  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (category.parentId) {
    parentCategory = await getCategoryById(category.parentId);
    if (!parentCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Parent category not found');
    }

    parentCategory.subCategories.pull(categoryId);
    await parentCategory.save();
  }

  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategoryById,
  deleteCategoryById,
};
