const mongoose = require('mongoose');
const { orderCartSchema } = require('./schemas');

// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { customAlphabet } = require('nanoid');

const uniqueOrderNo = customAlphabet('1234567890', 11);
const orderSchema = mongoose.Schema({
  // orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
  // cart: { type: mongoose.Schema.ObjectId, ref: 'OrderCart', required: true },
  orderNo: { type: String, required: true, unique: true, default: () => uniqueOrderNo() },
  cart: { type: orderCartSchema },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  // itemsPrice: { type: Number, required: true },
  // shipingsPrice: { type: Number, required: true },
  // totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  shipping: { type: String },
  deliveryDate: { type: Date },
  message: { type: String },
  summary: { type: String },
  expectedDeliveryDate: { type: Date, default: () => new Date() + 1000 * 60 * 60 * 24 * 7 }, // 7 days
  tax: { type: Number, default: 0 },
  paymentMethod: { type: String, required: true, default: 'COD' },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

orderSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'Delivered') {
    this.deliveryDate = Date.now();
  }
  next();
});

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
