const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON } = require('./plugins');

const brandSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Brand title is required'],
  },
});

brandSchema.plugin(toJSON);

/**
 * Check if category is already exist
 * @param {string} hexColorCode - The Color's hexColorCode
 * @returns {Promise<boolean>}
 */
brandSchema.statics.isBrandExist = async function (name) {
  const brandName = await this.findOne({ name });
  return !!brandName;
};

/**
 * @typedef Brand
 */
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
