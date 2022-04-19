const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');
const slugify = require('slugify');

const { Schema } = mongoose;
// const validator = require('validator');

const { variantSchema } = require('./schemas');

const { toJSON, paginate, productFiltering } = require('./plugins');

const productSchema = new Schema(
  {
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true, required: true }],
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
    tags: [{ type: String }],
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
      },
    ],
    slug: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.plugin(toJSON);
// productSchema.plugin(autoPopulate);
// productSchema.plugin(paginate);
productSchema.plugin(productFiltering);

productSchema.virtual('url').get(function () {
  return `localhost:3000/api/v1/products/${this.slug}`;
});

productSchema.pre('remove', async function (next) {
  await this.model('Variant').deleteMany({ _id: { $in: this.variants } });
  next();
});

//Slug generator
productSchema.pre('save', function (next) {
  this.slug = slugify(`${this.title}-${this.brand}`, { lower: true, replacement: '-' });
  next();
});

// productSchema.virtual('variants', {
//   ref: 'Variant',
//   localField: '_id',
//   foreignField: 'product',
//   autopopulate: true,
// });

productSchema.statics.isProductExist = async function (title) {
  const product = await this.findOne({ title });
  return !!product;
};

productSchema.statics.isProductExistById = async function (_id) {
  const product = await this.findOne({ _id });
  return !!product;
};

productSchema.statics.isProductExistByProductId = async function (productId) {
  const product = await this.findOne({ productId });
  return !!product;
};

// productSchema.pre('save', async function (next) {

// });

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
