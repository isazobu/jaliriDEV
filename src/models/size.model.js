const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON } = require('./plugins');

// Size model mongoose for product sku
const sizeSchema = Schema({
  size: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Size is required'],
  },
});

sizeSchema.plugin(toJSON);

sizeSchema.statics.isSizeExist = async function isSizeExist(size) {
  const sizeExist = await this.findOne({ size });
  return !!sizeExist;
};
sizeSchema.statics.getSize = async function getSize(size) {
  const sizeExist = await this.findOne({ size });
  return sizeExist;
};

/**
 * @typedef Size
 */
const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
