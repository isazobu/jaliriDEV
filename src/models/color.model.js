const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON } = require('./plugins');

const colorSchema = Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Category title is required'],
  },
  hexColorCode: { type: String, default: null },
});

colorSchema.plugin(toJSON);

/**
 * Check if category is already exist
 * @param {string} title - The category's title
 * @param {ObjectId} [excludeCategoryId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
colorSchema.statics.isHexColorCodeExist = async function (hexColorCode) {
  const hexColorCode = await this.findOne({ hexColorCode });
  return !!hexColorCode;
};

/**
 * @typedef Color
 */
const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
