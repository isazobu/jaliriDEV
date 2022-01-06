const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON } = require('./plugins');

// Country schema for e-commerce
const countrySchema = Schema({
  country: {
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
    unique: true,
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
