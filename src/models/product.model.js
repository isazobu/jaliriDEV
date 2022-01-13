const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const productSchema = Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    seoTitle: {
      type: String,
      trim: true,
      default: '',
    },

    description: {
      type: String,
      maxLength: 200,
      trim: true,
    },
    tags: [{ type: String }],
    hasVariants: { type: Boolean, default: false },
    brand: { type: String, required: true, trim: true, default: 'Jaliri' },
    variants: [{ type: Schema.Types.ObjectId, ref: 'SKU' }],
    // image: [{ type: String }],
    isActive: { type: Boolean, default: true },
    // discountExist: { type: Boolean, default: false },
    // discounPercent: { type: Number, min: 0, max: 100, default: 0 },
    // discountPrice: { type: Number, min: 0, default: 0 },

    hasStock: { type: Boolean }, // virtual
    totalStock: { type: Number, required: true, min: [0, 'It must not be lower than zero'], default: 0 },
    // url: { type: String }, // virtual
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    // country: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
    //  subCategory: { type: String, trim: true },
    // comment: {type: String, ref="Comment"},
    // commentCount: {type: Number,}
    // seller: {type: String, ref="Seller"},
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.virtual('url').get(function () {
  return `localhost:3000/api/v1/products/${this._id}`;
});

productSchema.statics.isProductExist = async function (title) {
  const product = await this.findOne({ title });
  return !!product;
};

// productSchema.pre('save', async function (next) {

// });

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
