const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bannerService } = require('../services');

const createBanner = catchAsync(async (req, res) => {
  const banner = await bannerService.createBanner(req.body);
  res.status(httpStatus.CREATED).send(banner);
});

const getBanners = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit']);
  const result = await bannerService.queryBanners(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getBanner = catchAsync(async (req, res) => {
  const banner = await bannerService.getBannerById(req.params.bannerId);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  res.status(httpStatus.OK).send(banner);
});

const getBannerByTitle = catchAsync(async (req, res) => {
  const banner = await bannerService.getBannerByTitle(req.params.bannerTitle);
  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  res.status(httpStatus.OK).send(banner);
});

const updateBanner = catchAsync(async (req, res) => {
  const banner = await bannerService.updateBannerById(req.params.bannerId, req.body);
  res.send(banner);
});

const deleteBanner = catchAsync(async (req, res) => {
  await bannerService.deleteBannerById(req.params.bannerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBanner,
  getBanners,
  getBanner,
  getBannerByTitle,
  updateBanner,
  deleteBanner,
};
