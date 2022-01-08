const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON } = require('./plugins');

// Country schema for e-commerce
const countrySchema = Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Country title is required'],
  },
  code: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Country code is required'],
  },
  currency: {
    type: String,
    trim: true,
    required: [true, 'Country currency is required'],
  },
  currencySymbol: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Country currency symbol is required'],
  },
});

countrySchema.plugin(toJSON);

/**
 * Check if country is already exist
 * @param {string} name - The Country name
 * @returns {Promise<boolean>}
 */
countrySchema.statics.isCountryExist = async function (name) {
  const country = await this.findOne({ name });
  return !!country;
};

// Get country by name
countrySchema.statics.getCountryByName = async function (name) {
  const country = await this.findOne({ name });
  return country;
};

/**
 * @typedef Country
 */
const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
