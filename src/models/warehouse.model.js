const mongoose = require('mongoose');

const { Schema } = mongoose;
const slugify = require('slugify');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const warehouseSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Warehouse title is required'],
    },
    image: { type: String },
    isActive: { type: Boolean, required: true, default: false },
    // warehouse slug model
    slug: {
      type: String,
      trim: true,
      required: [true, 'Warehouse slug is required'],
    },
  },
  { timestamps: true }
);

warehouseSchema.plugin(toJSON);
warehouseSchema.plugin(paginate);

/**
 * Check if warehouse is already exist
 * @param {string} title - The warehouse's title
 * @param {ObjectId} [excludeWarehouseId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
warehouseSchema.statics.isWarehouseExist = async function (title, excludeUserId) {
  const warehouse = await this.findOne({ title, _id: { $ne: excludeUserId } });
  return !!warehouse;
};

// pre Save Hook
warehouseSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

/**
 * @typedef Warehouse
 */
const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;
