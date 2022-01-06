const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON } = require('./plugins');

const colorSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Category title is required'],
  },
  hexColorCode: { type: String, default: null, trim: true },
});

colorSchema.plugin(toJSON);

/**
 * Check if category is already exist
 * @param {string} hexColorCode - The Color's hexColorCode
 * @returns {Promise<boolean>}
 */
colorSchema.statics.isHexColorCodeExist = async function (hexColorCode) {
  const code = await this.findOne({ hexColorCode });
  return !!code;
};

/**
 * @typedef Color
 */
const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
