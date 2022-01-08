const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { skuService } = require('../services');

const createSku = catchAsync(async (req, res) => {
  const sku = await skuService.createSku(req.body);
  res.status(httpStatus.CREATED).send(sku);
});

const getSku = catchAsync(async (req, res) => {
  const sku = await skuService.getSkuById(req.params.skuId);
  if (!sku) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sku not found');
  }
  res.status(httpStatus.OK).send(sku);
});

const getSkus = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'sku',
    'barcode',
    'name',
    'color',
    'size',
    'price',
    'freeShipping',
    'quantity',
    'country',
    'discountExist',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'paginate']);
  options.populate = 'country,color,size,price';
  const result = await skuService.querySkus(filter, options);
  res.status(httpStatus.OK).send(result);
});

const updateSku = catchAsync(async (req, res) => {
  const sku = await skuService.updateSkuById(req.params.skuId, req.body);
  res.send(sku);
});

const deleteSku = catchAsync(async (req, res) => {
  await skuService.deleteSkuById(req.params.skuId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSku,
  getSkus,
  getSku,
  updateSku,
  deleteSku,
};
