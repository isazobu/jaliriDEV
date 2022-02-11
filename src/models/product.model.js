const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');

const { Schema } = mongoose;
// const validator = require('validator');

const { variantSchema } = require('./schemas');

const { toJSON, paginate, productFiltering } = require('./plugins');


const productSchema = Schema(
  {
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true, required: true }],
    productId: { type: String, trim: true, required: [true, 'Product Id is required'] },
    title: {
      type: String,
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
    thumbnail: { type: String, required: [true, 'Thumbnail is required'] },
    brand: { type: String, required: [true, 'Brand is required'], trim: true, default: 'Jaliri' },
    warrantyMonth: { type: Number },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
      autopopulate: true,
    },
    variants: {
      type: variantSchema,
      required: true, // end variants
    },

  },
  {
    timestamps: true,
  }
);

productSchema.plugin(toJSON);
// productSchema.plugin(autoPopulate);
// productSchema.plugin(paginate);
productSchema.plugin(productFiltering);

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
