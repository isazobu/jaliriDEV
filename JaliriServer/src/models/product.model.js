const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

// const variantSchema = Schema({
//   item: { type: Schema.Types.ObjectId, ref = 'Product'},
//   attr: [
//     { name: String },
//     { value: String},
//   ],
//   stock: { type: String},
//   price: { type: Number}
// })
const productSchema = Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxLength: 200,
      trim: true,
    },
    tags: [{ type: String }],
    isVariants: { type: Boolean, default: false },

    brand: { type: String, default: 'Jaliri' },
    prices: [{ country: String, price: Number, currency: String }],
    // variants:[variantSchema],

    image: [{ type: String }],
    isActive: { type: Boolean, default: true },
    discountExist: { type: Boolean, default: false },
    discounPercent: { type: Number },
    discountPrice: { type: Number },
    freeShipping: { type: Boolean, default: false },
    hasStock: { type: Boolean }, // virtual
    totalStock: { type: Number, required: true, min: [0, 'It must be lower than zero'] },
    url: { type: String }, // virtual
    // category: {type: String, ref="Category"},
    // subCategory: {type: String,},
    // comment: {type: String, ref="Comment"},
    // commentCount: {type: Number,}
    // seller: {type: String, ref="Seller"},
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
