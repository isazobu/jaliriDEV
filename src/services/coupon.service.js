/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const { Coupon, User, Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a coupon
 * @param {Object} couponBody
 * @returns {Promise<Coupon>}
 */
const createCoupon = async (couponBody) => {
  if (await Coupon.isCouponExist(couponBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon already exist');
  }
  return Coupon.create(couponBody);
};

/**
 * Query for Coupons
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */
const queryCoupons = async (filter, options) => {
  const coupons = await Coupon.paginate(filter, options);
  return coupons;
};

/**
 *
 * @param {ObjectId} userId
 * @param {Object} couponBody
 * @returns {Promise<Coupon>}
 */
const redeemCoupon = async (userId, couponBody) => {
  const { code } = couponBody;
  if (!(await Coupon.isCouponValid(code))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon is not valid');
  }
  if (await Coupon.isRedeemdBefore(code, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon is already redeemed');
  }
  const coupon = await Coupon.findOne({ code });
  const user = await User.findById(userId);
  if (user.cart.coupon) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only one coupon is allowed per order');
  }
  await applyDiscount(user.cart, coupon);
  coupon.users.push(userId);
  await coupon.save();
  await user.save();
  return coupon;
};

/**
 * Get coupon by id
 * @param {ObjectId} id
 * @returns {Promise<Coupon>}
 */
const getCouponById = async (couponId) => {
  return Coupon.findById(couponId);
};

/**
 * Get coupon by name
 * @param {string} title
 * @returns {Promise<Coupon>}
 */
const getCouponByTitle = async (title) => {
  return Coupon.findOne({ title });
};

/**
 * Update coupon by id
 * @param {ObjectId} couponId
 * @param {Object} updateBody
 * @returns {Promise<Coupon>}
 */

const updateCouponById = async (couponId, updateBody) => {
  const coupon = await getCouponById(couponId);
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
  if (updateBody.code && (await Coupon.isCouponExist(updateBody.code, couponId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon already taken');
  }
  Object.assign(coupon, updateBody);
  await coupon.save();
  return coupon;
};

/**
 * Delete coupon by id
 * @param {ObjectId} couponId
 * @returns {Promise<Coupon>}
 */
const deleteCouponById = async (couponId) => {
  const coupon = await getCouponById(couponId);
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
  await coupon.remove();
  return coupon;
};

async function applyDiscount(cart, coupon) {
  const { type, value, specification, minCartAmount } = coupon;
  const skus = cart.items.map((item) => item.sku);

  // TODO: Logic for applying discount
  switch (specification) {
    case 'category':
      handleCategory();
      break;
    case 'product':
      handleProduct();
      break;
    case 'brand':
      await handleBrand();
      break;
    case 'variant':
      handleVariant();
      break;
    case 'all':
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid coupon specification');
  }

  if (type === 'percentage') {
    const discount = (cart.totalPrice * value) / 100;
    cart.totalPrice -= discount;
    cart.couponDiscount = discount;
  } else if (type === 'amount') {
    cart.totalPrice -= value;
    cart.couponDiscount = value;
  } else {
    if (minCartAmount && cart.totalPrice < minCartAmount) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Minimum cart amount is not reached');
    }
    cart.totalPrice -= cart.shippingPrice;
    cart.shippingPrice = 0;
  }
  cart.coupon = coupon.code;

  function handleVariant() {
    const variant = cart.items.find((item) => item.sku === coupon.specificationId);
    if (!variant) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'This copupon is only valid for this variant: ' + coupon.specificationId);
    }
  }

  async function handleBrand() {
    const isExist = (await Product.countDocuments({ 'variants.sku': { $in: skus }, brand: coupon.specificationId })) > 0;
    if (!isExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, `This copupon is only valid for this brand: ${coupon.specificationId}`);
    }
  }

  function handleProduct() {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not implemented');
  }

  function handleCategory() {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not implemented');
  }
}

module.exports = {
  createCoupon,
  queryCoupons,
  getCouponById,
  getCouponByTitle,
  updateCouponById,
  deleteCouponById,
  redeemCoupon,
};
