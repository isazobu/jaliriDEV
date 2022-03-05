const httpStatus = require('http-status');
const { Banner, Category } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a banner
 * @param {Object} bannerBody
 * @returns {Promise<Banner>}
 */
const createBanner = async (bannerBody) => {
  if (await Banner.isBannerExist(bannerBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Banner already exist');
  }
  if (!(await Category.isCategoryExist(bannerBody.category))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category does not exist');
  }

  return Banner.create(bannerBody);
};

/**
 * Query for Banners
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryBanners = async (filter, options) => {
  const banners = await Banner.paginate(filter, options);
  return banners;
};

/**
 * Get banner by id
 * @param {ObjectId} id
 * @returns {Promise<Banner>}
 */
const getBannerById = async (bannerId) => {
  return Banner.findById(bannerId);
};

/**
 * Get banner by name
 * @param {string} title
 * @returns {Promise<Banner>}
 */
const getBannerByTitle = async (title) => {
  return Banner.findOne({ title });
};

/**
 * Update banner by id
 * @param {ObjectId} bannerId
 * @param {Object} updateBody
 * @returns {Promise<Banner>}
 */

const updateBannerById = async (bannerId, updateBody) => {
  const banner = await getBannerById(bannerId);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  if (updateBody.title && (await Banner.isBannerExist(updateBody.title, bannerId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Banner already taken');
  }
  Object.assign(banner, updateBody);
  await banner.save();
  return banner;
};

/**
 * Delete banner by id
 * @param {ObjectId} bannerId
 * @returns {Promise<Banner>}
 */
const deleteBannerById = async (bannerId) => {
  const banner = await getBannerById(bannerId);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  await banner.remove();
  return banner;
};

module.exports = {
  createBanner,
  queryBanners,
  getBannerById,
  getBannerByTitle,
  updateBannerById,
  deleteBannerById,
};
