const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const wishlistSchema = Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

wishlistSchema.plugin(toJSON);
wishlistSchema.plugin(paginate);

/**
 * Check if wishlist is already exist
 * @param {ObjectId} product - The wishlist's title
 * @param {ObjectId} user - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
wishlistSchema.statics.isInWishlist = async function (product, user) {
  const wishlist = await this.findOne({ products: product, user });
  return !!wishlist;
};

/**
 * @typedef Wishlist
 */
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
