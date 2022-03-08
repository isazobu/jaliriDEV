const { Wishlist, Product } = require('../models');

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Create a wishlist
 * @param {Object} wishlistBody
 * @returns {Promise<Wishlist>}
 */
const createWishlist = async (wishlistBody) => {
  if (await Wishlist.isWishlistExist(wishlistBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wishlist already exist');
  }
  return Wishlist.create(wishlistBody);
};

const addToWishlist = async (user, product, country) => {
  if (!(await Product.findById(product))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  const wishlist = await Wishlist.findOne({ user, country });
  if (!wishlist) {
    return Wishlist.create({ user, products: [product], country });
  }
  if (wishlist.products.includes(product)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already in wishlist');
  }
  wishlist.products.push(product);
  await wishlist.save();
  return wishlist;
};

const removeFromWishlist = async (user, product, country) => {
  if (!(await Product.findById(product))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
  }
  const wishlist = await Wishlist.findOne({ user, country });
  if (!wishlist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wishlist not found');
  }
  if (!wishlist.products.includes(product)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not in wishlist');
  }
  wishlist.products = wishlist.products.filter((p) => p.toString() !== product.toString());
  await wishlist.save();
  return wishlist;
}

/**
 * Query for Wishlists
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryWishlists = async (filter, options) => {
  const wishlists = await Wishlist.paginate(filter, options);
  return wishlists;
};

/**
 * Get wishlist by id
 * @param {ObjectId} id
 * @returns {Promise<Wishlist>}
 */
const getWishlistById = async (wishlistId) => {
  return Wishlist.findById(wishlistId);
};

/**
 * Get wishlist by user
 * @param {ObjectId} user
 * @returns {Promise<Wishlist>}
 */
const getWishlistByUser = async (user, country) => {
  return await Wishlist.findOne({ user, country }) ?? { user, products: [], country };
};

/**
 * Update wishlist by id
 * @param {ObjectId} wishlistId
 * @param {Object} updateBody
 * @returns {Promise<Wishlist>}
 */

const updateWishlistById = async (wishlistId, updateBody) => {
  const wishlist = await getWishlistById(wishlistId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }
  Object.assign(wishlist, updateBody);
  await wishlist.save();
  return wishlist;
};

/**
 * Delete wishlist by id
 * @param {ObjectId} wishlistId
 * @returns {Promise<Wishlist>}
 */
const deleteWishlistById = async (wishlistId) => {
  const wishlist = await getWishlistById(wishlistId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }
  await wishlist.remove();
  return wishlist;
};

module.exports = {
  createWishlist,
  addToWishlist,
  removeFromWishlist,
  queryWishlists,
  getWishlistById,
  getWishlistByUser,
  updateWishlistById,
  deleteWishlistById,
};
