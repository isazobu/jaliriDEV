const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON } = require('./plugins');

const priceSchema = new Schema({
  sellingPrice: {
    value: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
    },
  },
  currency: {
    type: String,
    required: true,
  },
  discountedPrice: {
    value: { type: Number, required: true },
    text: { type: String },
  },
  listPrice: {
    value: { type: Number, required: true },
    text: { type: String },
  },

  totalPrice: {
    value: { type: Number },
    text: { type: String },
  },

  cargoPrice: {
    value: { type: Number, required: true },
    text: { type: String },
  },

  installmentPrice: { type: Number, required: true, default: 0 },
});

priceSchema.plugin(toJSON);

priceSchema.pre('save', function (next) {
  this.totalPrice.value = this.sellingPrice.value + this.cargoPrice.value;
  this.totalPrice.text = this.totalPrice.value + this.currency;
  this.sellingPrice.text = this.sellingPrice.value + this.currency;
  this.discountedPrice.text = this.discountedPrice.value + this.currency;
  next();
});
/**
 * @typedef Price
 */
const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
