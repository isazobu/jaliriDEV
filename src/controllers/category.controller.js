const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories= catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit']);
  const result = await categoryService.queryCategories(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getCategory = catchAsync(async (req, res) => {
  
  const category = await categoryService.getCategoryById(req.params.categoryId)
  if(!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }  
  res.status(httpStatus.OK).send(category);
})


const getCategoryByTitle = catchAsync(async (req, res) => {
  
  const category = await categoryService.getCategoryByTitle(req.params.categoryTitle)
  if(!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }  
  res.status(httpStatus.OK).send(category);
})



const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId,req.body)
  res.send(category);
})

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    getCategoryByTitle,
    updateCategory,
    deleteCategory

} 