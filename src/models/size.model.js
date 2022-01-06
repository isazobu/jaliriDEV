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

/**
 * @typedef Size
 */
const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
