const mongoose = require('mongoose');

const { Schema } = mongoose;
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const categorySchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Category title is required'],
    },
    image: { type: String },
    isActive: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if category is already exist
 * @param {string} title - The category's title
 * @param {ObjectId} [excludeCategoryId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 categorySchema.statics.isCategoryExist = async function (title, excludeUserId) {
  const category = await this.findOne({ title, _id: { $ne: excludeUserId } });
  return !!category;
};


/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
