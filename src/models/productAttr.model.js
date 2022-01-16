const mongoose = require('mongoose');

const { Schema } = mongoose;

// const validator = require('validator');
const { toJSON } = require('./plugins');

const productAttrSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      enum: ['colors', 'sizes', 'materials', 'styles', 'patterns'],
      default: 'sizes',
    },
    value: {
      type: String,
      trim: true,
      required: [true, 'Value is required'],
      default: 'OS',
    },
  },
  { timestamps: true }
);

productAttrSchema.plugin(toJSON);

/**
 * Check if productAttr is already exist
 * @param {string} name - The productAttr's name
 * @param {string} value - The productAttr's value
 * @returns {Promise<boolean>}
 */
productAttrSchema.statics.isProductAttrExist = async function (name, value) {
  const productAttr = await this.findOne({ name, value });
  return !!productAttr;
};

/**
 * @typedef ProductAttr
 */
const ProductAttr = mongoose.model('ProductAttr', productAttrSchema);

module.exports = ProductAttr;
