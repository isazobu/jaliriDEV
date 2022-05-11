const mongoose = require('mongoose');
const { Category } = require('../../src/models');

const categoryOne = {
  _id: mongoose.Types.ObjectId(),
  title: 'Category 1',
  image: 'image.com',
};

const insertCategories = async (categories) => {
  await Category.insertMany(categories);
};

module.exports = {
  categoryOne,
  insertCategories,
};
