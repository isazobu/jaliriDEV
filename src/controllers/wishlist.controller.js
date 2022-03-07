/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { wishlistService, countryService } = require('../services');
const { Country } = require('../models');

const createWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.createWishlist(req.body);
  res.status(httpStatus.CREATED).send(wishlist);
});

const addToWishlist = catchAsync(async (req, res) => {
  const user = req.user._id;
  const { product } = req.body;
  const { country } = req.headers;
  if (!country || !(await Country.isCountryExist(country))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  const wishlist = await wishlistService.addToWishlist(user, product, country);
  res.status(httpStatus.OK).send(wishlist);
});

const removeFromWishlist = catchAsync(async (req, res) => {
  const user = req.user._id;
  const { product } = req.body;
  const { country } = req.headers;
  if (!country || !(await Country.isCountryExist(country))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  const wishlist = await wishlistService.removeFromWishlist(user, product, country);
  res.status(httpStatus.OK).send(wishlist);
});

const getWishlists = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user', 'products', 'country']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await wishlistService.queryWishlists(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlistById(req.params.wishlistId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }
  res.status(httpStatus.OK).send(wishlist);
});

const getMyWishlist = catchAsync(async (req, res) => {
  const user = req.user._id;
  const { country } = req.headers;
  if (!country || !(await Country.isCountryExist(country))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  const wishlist = await wishlistService.getWishlistByUser(user, country);
  res.status(httpStatus.OK).send(wishlist);
});

const getWishlistByTitle = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlistByTitle(req.params.wishlistTitle);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }
  res.status(httpStatus.OK).send(wishlist);
});

const updateWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.updateWishlistById(req.params.wishlistId, req.body);
  res.send(wishlist);
});

const deleteWishlist = catchAsync(async (req, res) => {
  await wishlistService.deleteWishlistById(req.params.wishlistId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWishlist,
  addToWishlist,
  removeFromWishlist,
  getWishlists,
  getWishlist,
  getMyWishlist,
  getWishlistByTitle,
  updateWishlist,
  deleteWishlist,
};
