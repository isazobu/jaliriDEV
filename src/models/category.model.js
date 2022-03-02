const mongoose = require('mongoose');

const { Schema } = mongoose;
const slugify = require('slugify');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const categorySchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Category title is required'],
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    mainCategory: {
      type: Boolean,
      default: false,
    },

    image: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    // category slug model
    slug: {
      type: String,
      trim: true,
    },
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
categorySchema.statics.isCategoryExist = async function (title, parentId, excludeUserId) {
  const category = await this.findOne({ title, parentId: { $eq: parentId }, _id: { $ne: excludeUserId } });
  return !!category;
};

//Slug generator
categorySchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// push category to parent category
categorySchema.statics.pushCategoryToParent = async function (parentId, categoryId) {
  const parentCategory = await this.findById(parentId);
  if (!parentCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent category not found');
  }
  parentCategory.subCategories.push(categoryId);
  await parentCategory.save();
  return parentCategory;
};

// sub category
categorySchema.statics.getSubCategoryTree = async function (parentId) {
  const parentCategory = await this.findById(parentId);
  if (!parentCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent category not found');
  }
  const subCategories = await this.find({
    parentId: parentId,
  });
  return subCategories;
};

// sub category is exist
categorySchema.statics.isSubCategoryExist = async function (parentId, title) {
  const subCategory = await this.findOne({
    parentId: parentId,
    title: title,
  });
  return !!subCategory;
};

//  some category utils
categorySchema.statics.getCategoryTree = async function () {
  const categories = await this.find({ isActive: true }).sort({ title: 1 });
  const tree = categories.reduce((acc, category) => {
    if (!category.parentId) {
      acc.push(category);
    } else {
      const parent = categories.find((c) => c._id.toString() === category.parentId.toString());
      if (parent) {
        if (!parent.subCategories) {
          parent.subCategories = [];
        }
        parent.subCategories.push(category);
      }
    }
    return acc;
  }, []);
  return tree;
};

categorySchema.statics.getCategoryTreeByParentId = async function (parentId) {
  const categories = await this.find({ isActive: true, parentId });
  return categories;
};

categorySchema.statics.getCategoryTreeBySlug = async function (slug) {
  const categories = await this.find({ isActive: true, slug });
  return categories;
};

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
