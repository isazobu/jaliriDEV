const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');
const attributeSchema = require('./schemas/attribute.schema');

const variantSchema = mongoose.Schema({
  sku: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'SKU is required'],
  },
  barcode: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  attributes: [attributeSchema],
  // color: { type: String, trim: true },
  // size: { type: String },
  // material: { type: String, trim: true },
  // style: { type: String, trim: true },
  kg: { type: Number },
  dimension: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
  },
  image: [{ type: String }],

  // TODO: if multiple variants exist, then hasVariants set to true
  hasVariants: { type: Boolean, default: false },

  isActive: { type: Boolean, default: true },
  price: {
    currency: {
      type: String,
      required: true,
    },

    sellingPrice: {
      value: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
      },
    },
    discountExist: { type: Boolean, default: false },
    discountedPrice: {
      value: { type: Number },
      text: { type: String },
    },
    originalPrice: {
      value: { type: Number, required: true },
      text: { type: String },
    },

    discountAmount: {
      value: { type: Number, default: 0 },
      text: { type: String },
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed', 'none', 'free_shipping'],
      default: 'none',
    },

    shippingPrice: {
      value: { type: Number, required: true },
      text: { type: String },
    },

    // Price + shipping
    totalPrice: {
      value: { type: Number },
      text: { type: String },
    },

    installmentPrice: { type: Number, default: 0 },
  },

  freeShipping: { type: Boolean, default: false },
  hasStock: { type: Boolean }, // virtual
  totalStock: { type: Number, required: true, min: [0, 'It must not be lower than zero'], default: 0 },
  // url: { type: String }, // virtual

  //  subCategory: { type: String, trim: true },
  // comment: {type: String, ref="Comment"},
  // commentCount: {type: Number,}
  // seller: {type: String, ref="Seller"},

  // Eklenecek var mı?
  // Required?
  // Bu collection nasıl şişer ?
});

variantSchema.plugin(toJSON);
variantSchema.plugin(paginate);

/**
 * @typedef Variant
 */
const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;
