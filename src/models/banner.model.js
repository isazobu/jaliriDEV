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
    image: { type: String },
    isActive: { type: Boolean, required: true, default: false },
    // banner slug model
    slug: {
      type: String,
      trim: true,
      required: [true, 'Banner slug is required'],
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

/**
 * @typedef Banner
 */
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
