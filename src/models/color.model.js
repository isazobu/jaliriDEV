const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');
const { toJSON } = require('./plugins');

function colorValidator(v) {
  if (v.indexOf('#') == 0) {
    if (v.length == 7 || v.length == 4) {
      return true;
    }
  }
  return v.indexOf(v) > -1;
}

const colorSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Category title is required'],
  },
  hexColorCode: { type: String, trim: true, validate: [colorValidator, 'not a valid hex color code'] },
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

// Return color by name
colorSchema.statics.getColorByName = async function (name) {
  const color = await this.findOne({ name });
  return color;
};

colorSchema.virtual('X').get(function () {
  return this._id.toHexString();
});

colorSchema.set(function (newName) {});

/**
 * @typedef Color
 */
const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
