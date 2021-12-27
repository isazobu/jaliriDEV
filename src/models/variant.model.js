const mongoose = require('mongoose');

const attrProduct = require('../config/attrProduct');

const variantSchema = mongoose.Schema({
  size: { type: String, enum: attrProduct.SIZES, default: undefined },
  color: { type: String, enum: attrProduct.COLORS, default: undefined },

  prices: [
    {
      country: { type: String, required: true },
      price: { type: Number, required: true },
      currency: { type: String, required: true },
      // TODO: change stock
      stock: { type: Number, required: true },
    },
  ],
});
/**
 * @typedef Variant
 */
const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;
