const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, attributeService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const productItem = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(productItem);
});

const getVariants = catchAsync(async (req, res) => {
  const { skuId } = req.params;
  const { color } = req.query;
  const variants = await productService.getVariants(skuId, color);
  res.status(httpStatus.OK).send(variants);
});

const createManyProducts = catchAsync(async (req, res) => {
  const productItems = await productService.createManyProducts(req.body);
  res.status(httpStatus.CREATED).send(productItems);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.status(httpStatus.OK).send(product);
});

const getProductBySku = catchAsync(async (req, res) => {
  const product = await productService.getProductBySku(req.params.skuId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.status(httpStatus.OK).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'productId',
    'title',
    'discountExist',
    'price',
    'category',
    'brand',
    'size',
    'color',
    'country',
  ]);

  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await productService.queryProducts(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getAllSizeByColorWithSku = catchAsync(async (req, res) => {
  const { skuId } = req.params;

  const result = await productService.getAllSizeByColorWithSku(skuId);
  res.status(httpStatus.OK).send(result);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  createManyProducts,
  getProductBySku,
  getProducts,
  getVariants,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllSizeByColorWithSku,
};
