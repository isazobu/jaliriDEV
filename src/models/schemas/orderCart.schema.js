const mongoose = require('mongoose');
const { orderItemSchema } = require('.');

const orderCartSchema = new mongoose.Schema(
  {
    items: { type: [orderItemSchema] },
    totalPrice: { type: Number, required: true }, // totalPrice = totalSalesPrice * quantity
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    coupon: { type: String, default: null },
  },
  { _id: false }
);

module.exports = orderCartSchema;
