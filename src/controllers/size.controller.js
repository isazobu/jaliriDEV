const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sizeService } = require('../services');

const createSize = catchAsync(async (req, res) => {
  const size = await sizeService.createSize(req.body);
  res.status(httpStatus.CREATED).send(size);
});

const getSizes = catchAsync(async (req, res) => {
  const result = await sizeService.getAllSizes();
  res.status(httpStatus.OK).send(result);
});

const getSize = catchAsync(async (req, res) => {
  const size = await sizeService.getSizeById(req.params.sizeId);
  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }
  res.status(httpStatus.OK).send(size);
});

const getSizeByTitle = catchAsync(async (req, res) => {
  const size = await sizeService.getSizeByTitle(req.params.size);
  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }
  res.status(httpStatus.OK).send(size);
});

const updateSize = catchAsync(async (req, res) => {
  const size = await sizeService.updateSizeById(req.params.sizeId, req.body);
  res.send(size);
});

const deleteSize = catchAsync(async (req, res) => {
  await sizeService.deleteSizeById(req.params.sizeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSize,
  getSizes,
  getSize,
  getSizeByTitle,
  updateSize,
  deleteSize,
};
