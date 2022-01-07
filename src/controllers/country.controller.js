const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { countryService } = require('../services');

const createCountry = catchAsync(async (req, res) => {
  const country = await countryService.createCountry(req.body);
  res.status(httpStatus.CREATED).send(country);
});

const getCountries = catchAsync(async (req, res) => {
  const result = await countryService.getAllCountries();
  res.status(httpStatus.OK).send(result);
});

const getCountry = catchAsync(async (req, res) => {
  const country = await countryService.getCountryById(req.params.countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  res.status(httpStatus.OK).send(country);
});

const getCountryByCode = catchAsync(async (req, res) => {
  const country = await countryService.getCountryByCode(req.params.code);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  res.status(httpStatus.OK).send(country);
});

const updateCountry = catchAsync(async (req, res) => {
  const country = await countryService.updateCountryById(req.params.countryId, req.body);
  res.send(country);
});

const deleteCountry = catchAsync(async (req, res) => {
  await countryService.deleteCountryById(req.params.countryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCountry,
  getCountries,
  getCountry,
  getCountryByCode,
  updateCountry,
  deleteCountry,
};
