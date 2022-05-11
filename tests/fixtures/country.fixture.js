const mongoose = require('mongoose');
const { Country } = require('../../src/models');

const countryOne = {
  _id: mongoose.Types.ObjectId(),
  name: 'KUWAIT',
  code: 'KW',
  currency: 'Kad',
  currencySymbol: 'k',
  flagImage: 'imageflag.com',
};

const insertCountries = async (countries) => {
  await Country.insertMany(countries);
};

module.exports = {
  countryOne,
  insertCountries,
};
