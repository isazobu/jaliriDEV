const mongoose = require('mongoose');

const { Schema } = mongoose;
var slugify = require('slugify');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.split(' ');
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

const brandSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Brand title is required'],
    },
    isActive: { type: Boolean, required: true, default: true },

    // brand slug model
    slug: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

brandSchema.plugin(toJSON);
brandSchema.plugin(paginate);

/**
 * Check if brand is already exist
 * @param {string} name - The brand's title
 * @param {ObjectId} [excludeBrandSlug] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
brandSchema.statics.isBrandExist = async function (name, excludeBrandSlug) {
  const brand = await this.findOne({ name, slug: { $ne: excludeBrandSlug } });
  return !!brand;
};

// pre Save Hook
function brandPreSave(next) {
  this.slug = slugify(this.name, { lower: true });
  this.name = capitalizeTheFirstLetterOfEachWord(this.name);
  next();
}
brandSchema.pre('save', brandPreSave);

/**
 * @typedef Brand
 */
const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand, brandPreSave };
