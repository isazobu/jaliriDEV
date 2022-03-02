/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');

const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const couponSchema = Schema(
  {
    code: {
      type: String,
      required: [true, 'Code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: ['percentage', 'amount', 'freeShipping'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      min: [0, 'Value must be greater than 0'],
    },
    countryCode: {
      type: String,
      required: [true, 'Country code is required'],
      trim: true,
    },
    specification: {
      type: String,
      enum: ['category', 'product', 'brand', 'variant', 'all'],
      required: [true, 'Specification is required'],
      default: 'all',
      trim: true,
    },
    specificationId: {
      type: String,
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    minCartAmount: {
      type: Number,
    },
    minQuantity: {
      type: Number,
    },
    maxRedeem: {
      type: Number,
      default: null,
    },
    timesRedeemed: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      default: Date.now,
      validate: {
        validator(startDate) {
          return startDate <= this.expireDate;
        },
        message: 'Start date must be before end date',
      },
    },
    expireDate: {
      type: Date,
      required: [true, 'End date is required'],
      default: () => Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      validate: {
        validator(expireDate) {
          return expireDate >= this.startDate;
        },
        message: 'End date must be after start date',
      },
    },
  },
  { timestamps: true }
);

couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

/**
 * Check if coupon is already exist
 * @param {string} code - The coupon's code
 * @returns {Promise<boolean>}
 */
couponSchema.statics.isCouponExist = async function (code) {
  const coupon = await this.findOne({ code });
  return !!coupon;
};

/**
 * Check if coupon is valid or not
 * @param {string} code - The coupon's code
 * @returns {Promise<boolean>}
 */
couponSchema.statics.isCouponValid = async function (code) {
  const coupon = await this.findOne({
    code,
    isActive: true,
    startDate: { $lte: Date.now() },
    expireDate: { $gte: Date.now() },
  });
  return !!coupon;
};

/**
 * Check if coupon is used or not
 * @param {string} code
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
couponSchema.statics.isRedeemdBefore = async function (code, userId) {
  const coupon = await this.findOne({
    code,
    users: userId,
  });
  return !!coupon;
};

couponSchema.pre('save', async function (next) {
  this.timesRedeemed = this.users.length;
  if (this.totalRedeem && this.totalRedeem === this.timesRedeemed) {
    this.isActive = false;
  }
  next();
});

// // pre Save Hook
// couponSchema.pre('save', function (next) {
//   const currentDate = new Date();
//   this.updated_at = currentDate;
//   if (!this.created_at) this.created_at = currentDate;
//   next();
// });

/**
 * @typedef Coupon
 */
const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
