const mongoose = require('mongoose');

// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const orderItemSchema = mongoose.Schema({
  quantity: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

orderItemSchema.plugin(toJSON);
orderItemSchema.plugin(paginate);

/**
 * @typedef OrderItem
 */
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
