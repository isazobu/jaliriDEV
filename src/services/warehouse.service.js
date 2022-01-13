const httpStatus = require('http-status');
const { Warehouse } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a warehouse
 * @param {Object} warehouseBody
 * @returns {Promise<Warehouse>}
 */
const createWarehouse = async (warehouseBody) => {
  if (await Warehouse.isWarehouseExist(warehouseBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Warehouse already exist');
  }
  return Warehouse.create(warehouseBody);
};

/**
 * Query for Warehouses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryWarehouses = async (filter, options) => {
  const warehouses = await Warehouse.paginate(filter, options);
  return warehouses;
};

/**
 * Get warehouse by id
 * @param {ObjectId} id
 * @returns {Promise<Warehouse>}
 */
const getWarehouseById = async (warehouseId) => {
  return Warehouse.findById(warehouseId);
};

/**
 * Get warehouse by name
 * @param {string} title
 * @returns {Promise<Warehouse>}
 */
const getWarehouseByTitle = async (title) => {
  return Warehouse.findOne({ title });
};

/**
 * Update warehouse by id
 * @param {ObjectId} warehouseId
 * @param {Object} updateBody
 * @returns {Promise<Warehouse>}
 */

const updateWarehouseById = async (warehouseId, updateBody) => {
  const warehouse = await getWarehouseById(warehouseId);
  if (!warehouse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Warehouse not found');
  }
  if (updateBody.title && (await Warehouse.isWarehouseExist(updateBody.title, warehouseId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Warehouse already taken');
  }
  Object.assign(warehouse, updateBody);
  await warehouse.save();
  return warehouse;
};

/**
 * Delete warehouse by id
 * @param {ObjectId} warehouseId
 * @returns {Promise<Warehouse>}
 */
const deleteWarehouseById = async (warehouseId) => {
  const warehouse = await getWarehouseById(warehouseId);
  if (!warehouse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Warehouse not found');
  }
  await warehouse.remove();
  return warehouse;
};

module.exports = {
  createWarehouse,
  queryWarehouses,
  getWarehouseById,
  getWarehouseByTitle,
  updateWarehouseById,
  deleteWarehouseById,
};
