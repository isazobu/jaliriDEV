const mongoose = require('mongoose');

//const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const addressSchema = mongoose.Schema(
  {
    fullName: { type: 'string', required: true, trim: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    addressText: { type: String, required: true, trim: true },
    addressType: { type: String, required: true, trim: true, default: 'Delivery' },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);

/**
 * Check if title is taken
 * @param {string} title - The address's title
 * @param {ObjectId} [userId] - The id of the user
 * @returns {Promise<boolean>}
 */
addressSchema.statics.isAddressExist = async function (title, user) {
  const address = await this.findOne({ title, user });
  return !!address;
};

/**
 * @typedef Address
 */
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
