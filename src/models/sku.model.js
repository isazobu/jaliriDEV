const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

// SKU schema for e-commerce E COMMERCE STOCK KEEPING UNIT MODEL
const skuSchema = new Schema(
  {
    sku: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'SKU is required'],
    },
    barcode: { type: String, trim: true, required: [true, 'Barcode is required'] },
    // TODO: Add name: size + color attr
    name: { type: String, trim: true, required: [true, 'Name is required'] },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
      required: [true, 'Color is required'],
    },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
    image: [{ type: String, trim: true, required: [true, 'Image is required'] }],
    price: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Price',
      required: [true, 'Price is required'],
    },
    freeShipping: { type: Boolean, default: false },
    discountExist: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    quantity: {
      type: Number,
      trim: true,
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

skuSchema.statics.isSkuExist = async function (sku) {
  const skuExist = await this.findOne({ sku });
  return !!skuExist;
};

/**
 * @typedef SKU
 */
const SKU = mongoose.model('SKU', skuSchema);

// SKU create function

// preSave method sku
skuSchema.pre('validate', true, async function (next) {
  if (this.isModified('sku')) {
    this.sku = this.sku.toUpperCase();
  }
  if (this.isModified('discountPrice')) {
    this.discountExist = true;
  }

  if (this.Country.code === 'UAE' && this.price.discountPrice.value > 200) {
    this.freeShipping = true;
  } else if (this.Country.code === 'KW' && this.price.discountPrice.value > 20) {
    this.freeShipping = true;
  }

  next();
});

module.exports = SKU;
