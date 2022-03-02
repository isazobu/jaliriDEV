const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, countryService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const productItem = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(productItem);
});

const getVariants = catchAsync(async (req, res) => {
  const { skuId } = req.params;

  const variants = await productService.getVariants(skuId);
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
  const filter = pick(req.query, ['productId', 'title', 'discountExist', 'price', 'category', 'brand', 'size', 'color']);
  // append filter array from header country
  if (req.headers.country) {
    const country = await countryService.getCountryByCode(req.headers.country);
    if (country) {
      filter.country = req.headers.country;
    } else {
      res.status(httpStatus.NOT_FOUND).send('Country not found');
    }
  } else {
    res.status(httpStatus.NOT_FOUND).send('Country not found');
  }

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

const getManySku = catchAsync(async (req, res) => {
  const skuIds = req.body.skuIds;
  const products = await productService.getManySku(skuIds);
  res.status(httpStatus.OK).send(products);
});

module.exports = {
  createProduct,
  createManyProducts,
  getProductBySku,
  getProducts,
  getVariants,
  getProduct,
  updateProduct,
  getManySku,
  deleteProduct,
  getAllSizeByColorWithSku,
};
