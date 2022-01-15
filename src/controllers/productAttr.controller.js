const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productAttrService } = require('../services');

const createProductAttr = catchAsync(async (req, res) => {
  const productAttr = await productAttrService.createProductAttr(req.body);
  res.status(httpStatus.CREATED).send(productAttr);
});

const getProductAttrs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit']);
  const result = await productAttrService.queryProductAttrs(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getProductAttr = catchAsync(async (req, res) => {
  const productAttr = await productAttrService.getProductAttrById(req.params.productAttrId);
  if (!productAttr) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductAttr not found');
  }
  res.status(httpStatus.OK).send(productAttr);
});

const getProductAttrByTitle = catchAsync(async (req, res) => {
  const productAttr = await productAttrService.getProductAttrByTitle(req.params.productAttrTitle);
  if (!productAttr) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductAttr not found');
  }
  res.status(httpStatus.OK).send(productAttr);
});

const updateProductAttr = catchAsync(async (req, res) => {
  const productAttr = await productAttrService.updateProductAttrById(req.params.productAttrId, req.body);
  res.send(productAttr);
});

const deleteProductAttr = catchAsync(async (req, res) => {
  await productAttrService.deleteProductAttrById(req.params.productAttrId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductAttr,
  getProductAttrs,
  getProductAttr,
  getProductAttrByTitle,
  updateProductAttr,
  deleteProductAttr,
};
