const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const skuSchema = new Schema(
  {
    name: { type: String, trim: true, required: [true, 'Name is required'] },
    sku: {
      type: String,
      trim: true,
      unique: true,
      toUpperCase: true,
      required: [true, 'SKU is required'],
    },
    brand: { type: String, trim: true, required: [true, 'Brand is required'] },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },

    quantityLimitPerCustomer: {
      type: Number,
      default: 0,
    },
    quantityOrdered: {
      type: Number,
      default: 0,
    },
    quantityAvailable: {
      type: Number,
      default: 0,
    },

    barcode: { type: String, trim: true, unique: true, required: [true, 'Barcode is required'] },

    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
      required: [true, 'Color is required'],
    },
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
    dimension: {
      length: { type: Number, required: true, default: 0 },
      width: { type: Number, required: true, default: 0 },
      height: { type: Number, required: true, default: 0 },
      weight: { type: Number, required: true, default: 0 },
    },
    images: [{ type: String, trim: true, required: [true, 'Image is required'] }],
    price: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Price',
      required: [true, 'Price is required'],
    },
    weight: { type: Number, min: 0, default: 0 },
    freeShipping: { type: Boolean, default: false },
    discountExist: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    quantity: {
      type: Number,
      trim: true,
      required: [true, 'SKU quantity is required'],
    },
    hasStock: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: [true, 'Country is required'],
    },

    // quantityInTransit: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityOnHold: {
    //   type: Number,

    //   default: 0,
    // },
    // quantityBackordered: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityShipped: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityReturned: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityCancelled: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityRefunded: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityAllocated: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityAvailableForSale: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityAvailableForCheckout: {
    //   type: Number,
    //   default: 0,
    // },
    // quantityAvailableForOrder: {
    //   type: Number,
    //   default: 0,
    // },
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
