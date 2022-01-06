const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const Size = require('./size.model');

// SKU schema for e-commerce E COMMERCE STOCK KEEPING UNIT MODEL
const skuSchema = Schema(
  {
    sku: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'SKU is required'],
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
      required: [true, 'Color is required'],
    },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true, default: Size.findOne({ name: 'OS' }) },

    price: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, 'SKU price is required'],
    },

    quantity: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, 'SKU quantity is required'],
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: [true, 'Country is required'],
    },
  },
  { timestamps: true }
);

skuSchema.plugin(toJSON);
skuSchema.plugin(paginate);

skuSchema.statics.isSkuExist = async function (name) {
  const sku = await this.findOne({ name });
  return !!sku;
};

/**
 * @typedef SKU
 */
const SKU = mongoose.model('SKU', skuSchema);

module.exports = SKU;
