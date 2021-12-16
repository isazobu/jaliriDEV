const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isCategoryExist(categoryBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category already exist');
  }
  return Category.create(categoryBody);
};

/**
 * Query for Categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
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
const getCategoryById= async (categoryId) => {
  return Category.findById(categoryId);
} 


/**
 * Get user by email
 * @param {string} title
 * @returns {Promise<Category>}
 */
 const getCategoryByTitle = async (title) => {
  return Category.findOne({ title });
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
  await category.remove();
  return category;
};



module.exports = {
    createCategory,
    queryCategories,
    getCategoryById,
    getCategoryByTitle,
    updateCategoryById,
    deleteCategoryById,
}