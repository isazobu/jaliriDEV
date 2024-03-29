const mongoose = require('mongoose');
const attributeSchema = require('./attribute.schema');

const orderItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  sku: { type: String, required: true }, // sku
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: { type: String, required: true },
  brand: { type: String, required: true },
  attributes: [attributeSchema],
  images: [{ type: String }],
  totalDiscount: { type: Number, required: true }, // discount for this item
  totalSalesPrice: { type: Number, required: true }, // totalSalesPrice = totalPrice - totalDiscount
  totalPrice: { type: Number, required: true }, // totalPrice = totalSalesPrice * quantity
});

module.exports = orderItemSchema;
