const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  sku: { type: String, required: true }, // sku
  totalDiscount: { type: Number, required: true }, // discount for this item
  totalSalesPrice: { type: Number, required: true }, // totalSalesPrice = totalPrice - totalDiscount
  totalPrice: { type: Number, required: true }, // totalPrice = totalSalesPrice * quantity
});

module.exports = orderItemSchema;
