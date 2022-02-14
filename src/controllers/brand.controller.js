const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { brandService } = require('../services');

const createBrand = catchAsync(async (req, res) => {
  const brand = await brandService.createBrand(req.body);
  res.status(httpStatus.CREATED).send(brand);
});

const getBrands = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'isActive', 'slug']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await brandService.queryBrands(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getBrand = catchAsync(async (req, res) => {
  const brand = await brandService.getBrandById(req.params.brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  res.status(httpStatus.OK).send(brand);
});

const getBrandBySlug = catchAsync(async (req, res) => {
  const brand = await brandService.getBrandBySlug(req.params.brandSlug);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  res.status(httpStatus.OK).send(brand);
});

const updateBrand = catchAsync(async (req, res) => {
  const brand = await brandService.updateBrandBySlug(req.params.brandSlug, req.body);
  res.send(brand);
});

const deleteBrand = catchAsync(async (req, res) => {
  await brandService.deleteBrandBySlug(req.params.brandSlug);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  getBrandBySlug,
  updateBrand,
  deleteBrand,
};
