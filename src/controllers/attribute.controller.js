const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { attributeService } = require('../services');

const createAttribute = catchAsync(async (req, res) => {
  const attribute = await attributeService.createAttribute(req.body);
  res.status(httpStatus.CREATED).send(attribute);
});

const getAttributes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit']);
  const result = await attributeService.queryAttributes(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getAttribute = catchAsync(async (req, res) => {
  const attribute = await attributeService.getAttributeById(req.params.attributeId);
  if (!attribute) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  }
  res.status(httpStatus.OK).send(attribute);
});

const getAttributeByCouple = catchAsync(async (req, res) => {
  const attribute = await attributeService.getAttributeByCouple(req.params.attributeName, req.params.attributeValue);
  if (!attribute) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attribute not found');
  }
  res.status(httpStatus.OK).send(attribute);
});

const updateAttribute = catchAsync(async (req, res) => {
  const attribute = await attributeService.updateAttributeById(req.params.attributeId, req.body);
  res.send(attribute);
});

const deleteAttribute = catchAsync(async (req, res) => {
  await attributeService.deleteAttributeById(req.params.attributeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAttribute,
  getAttributes,
  getAttribute,
  getAttributeByCouple,
  updateAttribute,
  deleteAttribute,
};
