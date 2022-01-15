const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const productSchema = Schema(
  {
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
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
    },
    variants: {
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
      attributes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Attribute',
          required: true,
        },
      ],

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
      tags: [{ type: String }],
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
    }, // end variants

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
