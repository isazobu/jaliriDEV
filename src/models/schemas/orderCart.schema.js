const mongoose = require('mongoose');
const { orderItemSchema } = require('.');

const orderCartSchema = mongoose.Schema({
  items: { type: [orderItemSchema], required: true },
  totalPrice: { type: Number, required: true }, // totalPrice = totalSalesPrice * quantity
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
});

module.exports = orderCartSchema;
