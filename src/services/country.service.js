const httpStatus = require('http-status');
const { Country } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a country
 * @param {Object} countryBody
 * @returns {Promise<Country>}
 */
const createCountry = async (countryBody) => {
  if (await Country.isCountryExist(countryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Country already exist');
  }
  return Country.create(countryBody);
};

/**
 * Get All countries
 * @returns {Promise<[Country]>}
 */

const getAllCountries = async () => {
  const countries = await Country.find({});
  return countries;
};

/**
 * Get country by id
 * @param {ObjectId} id
 * @returns {Promise<Country>}
 */
const getCountryById = async (countryId) => {
  return Country.findById(countryId);
};

/**
 * Get country by name
 * @param {string} name
 * @returns {Promise<Country>}
 */
const getCountryByCode = async (code) => {
  return Country.findOne({ code: code.toUpperCase() });
};

/**
 * Update country by id
 * @param {ObjectId} countryId
 * @param {Object} updateBody
 * @returns {Promise<Country>}
 */

const updateCountryById = async (countryId, updateBody) => {
  const country = await getCountryById(countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  if (updateBody.country && (await Country.isCountryExist(updateBody.country, countryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Country already taken');
  }
  Object.assign(country, updateBody);
  await country.save();
  return country;
};

/**
 * Delete country by id
 * @param {ObjectId} countryId
 * @returns {Promise<Country>}
 */
const deleteCountryById = async (countryId) => {
  const country = await getCountryById(countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  await country.remove();
  return country;
};

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  getCountryByCode,
  queryCountries,
  updateCountryById,
  deleteCountryById,
};
