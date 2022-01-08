const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');
const { toJSON } = require('./plugins');

function colorValidator(v) {
  if (v.indexOf('#') == 0) {
    if (v.length == 7) {
      // #f0f0f0
      return true;
    } else if (v.length == 4) {
      // #fff
      return true;
    }
  }
  return COLORS.indexOf(v) > -1;
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

/**
 * @typedef Color
 */
const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
