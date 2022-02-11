const mongoose = require('mongoose');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

const attributeSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

attributeSchema.plugin(toJSON);
attributeSchema.plugin(paginate);

/**
 * Check if attribute is already exist
 * @param {string} name - The attribute name
 * @param {string} value- The attibute's value
 * @param {ObjectId} [excludeAttrId] - The id of the attribute to be excluded
 * @returns {Promise<boolean>}
 */
attributeSchema.statics.isAttributeExist = async function (name, value, excludeAttrId) {
  const attribute = await this.findOne({ name, value, _id: { $ne: excludeAttrId } });
  return !!attribute;
};

// Slugify Name-Value
attributeSchema.pre('save', async function (next) {
  this.slug = `${this.name}-${this.value}`;
  next();
});

/**
 * @typedef Attribute
 */
const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;
