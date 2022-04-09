const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');

const { Schema } = mongoose;
// const validator = require('validator');

const { variantSchema } = require('./schemas');

const { toJSON, paginate, productFiltering } = require('./plugins');

const productSchema = Schema(
  {
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true, required: true }],
    title: {
      type: String,
      trim: true,
      required: true,
      // unique validate title
      validate: {
        validator: async function (title) {
          const product = await this.model('Product').findOne({ title });
          return !product;
        },
        message: 'Product title already exist',
      },
    },
    seoTitle: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      maxlength: 500,
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
        type: variantSchema,
        required: true, // end variants
      },
    ],
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

// prices values to prices text in variants
productSchema.pre('save', async function (next) {
  const variants = this.variants;
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const { price } = variant;
    const { currency, sellingPrice, discountedPrice, originalPrice, discountAmount, shippingPrice, totalPrice } = price;
    // all values to text
    if (sellingPrice) {
      sellingPrice.text = `${currency} ${sellingPrice.value}`;
    }
    if (discountedPrice) {
      variant.price.discountedPrice.text = `${currency} ${discountedPrice.value}`;
    }
    if (originalPrice) {
      variant.price.originalPrice.text = `${currency} ${originalPrice.value}`;
    }
    if (discountAmount) {
      variant.price.discountAmount.text = `${currency} ${discountAmount.value}`;
    }
    if (shippingPrice) {
      variant.price.shippingPrice.text = `${currency} ${shippingPrice.value}`;
    }
    if (totalPrice) {
      variant.price.totalPrice.text = `${currency} ${totalPrice.value}`;
    }
  }
  next();
});

productSchema.statics.isProductExist = async function (title) {
  const product = await this.findOne({ title });
  return !!product;
};

productSchema.statics.isProductExistByProductId = async function (productId) {
  const product = await this.findOne({ productId: productId });
  return !!product;
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
