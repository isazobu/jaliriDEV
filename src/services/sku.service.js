const httpStatus = require('http-status');
const { Sku, Color, Country, Size, Price } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a sku
 * @param {Object} skuBody
 * @returns {Promise<Sku>}
 */
const createSku = async (skuBody) => {
  if (await Sku.isSkuExist(skuBody.sku)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sku already exist');
  }
  // Color check
  if (skuBody.color && skuBody.country && skuBody.size) {
    const color = await Color.getColorByName(skuBody.color);
    const country = await Country.getCountryByName(skuBody.country);
    const size = await Size.getSize(skuBody.size);
    if (!color || !country || !size) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'There is NOT at least one of Color/Size/Country');
    }

    const skuPrice = await Price.create(skuBody.price);

    const sku = new Sku({
      sku: skuBody.sku,
      name: skuBody.name,
      barcode: skuBody.barcode,
      color: color._id,
      country: country._id,
      size: size._id,
      price: skuPrice._id,
      quantity: skuBody.quantity,
      image: skuBody.image,
      freeShipping: skuBody.freeShipping,
      discountExist: skuBody.discountExist,
      discount: skuBody.discount,
    });

    return Sku.create(sku);
  }
};

/**
 * Query for Skus
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const querySkus = async (filter, options) => {
  const skus = await Sku.paginate(filter, options);
  return skus;
};

const getSkus = async () => {
  const skus = await Sku.find({});
  return skus;
};

/**
 * Get sku by id
 * @param {ObjectId} id
 * @returns {Promise<Sku>}
 */
const getSkuById = async (skuId) => {
  return Sku.findById(skuId);
};

/**
 * Get sku by value
 * @param {string} sku
 * @returns {Promise<Sku>}
 */
const getSkuByTitle = async (sku) => {
  return Sku.findOne({ sku });
};

/**
 * Update sku by id
 * @param {ObjectId} skuId
 * @param {Object} updateBody
 * @returns {Promise<Sku>}
 */

const updateSkuById = async (skuId, updateBody) => {
  const sku = await getSkuById(skuId);
  if (!sku) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sku not found');
  }
  if (updateBody.sku && (await Sku.isSkuExist(updateBody.sku))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sku already taken');
  }
  Object.assign(sku, updateBody);
  await sku.save();
  return sku;
};

/**
 * Delete sku by id
 * @param {ObjectId} skuId
 * @returns {Promise<Sku>}
 */
const deleteSkuById = async (skuId) => {
  const sku = await getSkuById(skuId);
  if (!sku) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sku not found');
  }
  await sku.remove();
  return sku;
};

module.exports = {
  createSku,
  querySkus,
  getSkus,
  getSkuById,
  getSkuByTitle,
  updateSkuById,
  deleteSkuById,
};
