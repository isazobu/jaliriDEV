const mongoose = require('mongoose');

const { Schema } = mongoose;
const slugify = require('slugify');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const bannerSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Banner title is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    // Country modelden title olarak çekilecek.
    country: {
      type: String,
      trim: true,
      required: true,
    },
    image: { type: String, required: true },
    url: { type: String, required: true },
    field: { type: String, required: true },
    target: { type: String, required: true },
    row: { type: Number, required: true, unique: true, default: 0 },
    isActive: { type: Boolean, required: true, default: true },
    // banner slug model
    slug: {
      type: String,
      trim: true,
      // required: [true, 'Banner slug is required'],
    },
  },
  { timestamps: true }
);

bannerSchema.plugin(toJSON);
bannerSchema.plugin(paginate);

/**
 * Check if banner is already exist
 * @param {string} title - The banner's title
 * @param {ObjectId} [excludeBannerId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
bannerSchema.statics.isBannerExist = async function (title, excludeUserId) {
  const banner = await this.findOne({ title, _id: { $ne: excludeUserId } });
  return !!banner;
};

// pre Save Hook
bannerSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// is category id doesnt exist ?
bannerSchema.statics.isCategoryExist = async function (categoryId) {
  const category = await this.model('Category').findById(categoryId);
  return !!category;
};

/**
 * @typedef Banner
 */
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
