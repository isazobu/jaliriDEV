const mongoose = require('mongoose');

const attributeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

attributeSchema.pre('save', async function (next) {
  this.slug = `${this.name}-${this.value}`;
  next();
});

module.exports = attributeSchema;
