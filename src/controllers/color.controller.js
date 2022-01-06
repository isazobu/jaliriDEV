const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { colorService } = require('../services');

const createColor = catchAsync(async (req, res) => {
  const color = await colorService.createColor(req.body);
  res.status(httpStatus.CREATED).send(color);
});

const getColors = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name']);
  // const options = pick(req.query, ['sortBy', 'limit']);
  // const result = await colorService.queryColors(filter, options);
  const result = await colorService.getColors();
  res.status(httpStatus.OK).send(result);
});

const getColor = catchAsync(async (req, res) => {
  const color = await colorService.getColorById(req.params.colorId);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  res.status(httpStatus.OK).send(color);
});

const getColorByTitle = catchAsync(async (req, res) => {
  const color = await colorService.getColorByTitle(req.params.colorName);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  res.status(httpStatus.OK).send(color);
});

const updateColor = catchAsync(async (req, res) => {
  const color = await colorService.updateColorById(req.params.colorId, req.body);
  res.send(color);
});

const deleteColor = catchAsync(async (req, res) => {
  await colorService.deleteColorById(req.params.colorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createColor,
  getColors,
  getColor,
  getColorByTitle,
  updateColor,
  deleteColor,
};
