const mongoose = require('mongoose');
const { toJSON } = require('../plugins');

const addressSchema = mongoose.Schema(
  {
    fullName: { type: 'string', required: true, trim: true },
    title: {
      type: String,
      trim: true,
    },
    addressText: { type: String, required: true, trim: true },
    addressType: { type: String, required: true, trim: true, default: 'Delivery' },
    country: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

addressSchema.plugin(toJSON);

module.exports = addressSchema;
