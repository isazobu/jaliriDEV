const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { warehouseService } = require('../services');

const createWarehouse = catchAsync(async (req, res) => {
  const warehouse = await warehouseService.createWarehouse(req.body);
  res.status(httpStatus.CREATED).send(warehouse);
});

const getWarehouses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit']);
  const result = await warehouseService.queryWarehouses(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getWarehouse = catchAsync(async (req, res) => {
  const warehouse = await warehouseService.getWarehouseById(req.params.warehouseId);
  if (!warehouse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Warehouse not found');
  }
  res.status(httpStatus.OK).send(warehouse);
});

const getWarehouseByTitle = catchAsync(async (req, res) => {
  const warehouse = await warehouseService.getWarehouseByTitle(req.params.warehouseTitle);
  if (!warehouse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Warehouse not found');
  }
  res.status(httpStatus.OK).send(warehouse);
});

const updateWarehouse = catchAsync(async (req, res) => {
  const warehouse = await warehouseService.updateWarehouseById(req.params.warehouseId, req.body);
  res.send(warehouse);
});

const deleteWarehouse = catchAsync(async (req, res) => {
  await warehouseService.deleteWarehouseById(req.params.warehouseId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWarehouse,
  getWarehouses,
  getWarehouse,
  getWarehouseByTitle,
  updateWarehouse,
  deleteWarehouse,
};
