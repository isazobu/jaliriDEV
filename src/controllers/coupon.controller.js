const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { couponService } = require('../services');

const createCoupon = catchAsync(async (req, res) => {
  const coupon = await couponService.createCoupon(req.body);
  res.status(httpStatus.CREATED).send(coupon);
});

const getCoupons = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isActive', 'type', 'countryCode']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await couponService.queryCoupons(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getCoupon = catchAsync(async (req, res) => {
  const coupon = await couponService.getCouponById(req.params.couponId);
  res.status(httpStatus.OK).send(coupon);
});

const redeemCoupon = catchAsync(async (req, res) => {
  if (!req.user.cart) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UserCart is empty');
  }
  const coupon = await couponService.redeemCoupon(req.user._id, req.body);
  res.status(httpStatus.OK).send(coupon);
});

const getCouponByTitle = catchAsync(async (req, res) => {
  const coupon = await couponService.getCouponByTitle(req.params.couponTitle);
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
  res.status(httpStatus.OK).send(coupon);
});

const updateCoupon = catchAsync(async (req, res) => {
  const coupon = await couponService.updateCouponById(req.params.couponId, req.body);
  res.send(coupon);
});

const deleteCoupon = catchAsync(async (req, res) => {
  await couponService.deleteCouponById(req.params.couponId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCoupon,
  getCoupons,
  getCoupon,
  getCouponByTitle,
  updateCoupon,
  deleteCoupon,
  redeemCoupon,
};
