const faker = require('faker');
const mongoose = require('mongoose');
const { Category } = require('../../../src/models');

describe('Category model', () => {
  describe('Category validation', () => {
    let newCategory;
    beforeEach(() => {
      newCategory = {
        title: faker.name.findName(),
        parentId: mongoose.Types.ObjectId(),
        subCategories: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        image: faker.image.imageUrl(),
      };
    });

    test('should correctly validate a valid category', async () => {
      await expect(new Category(newCategory).validate()).resolves.toBeUndefined();
    });

    test('should correctly validate if parentId is null', async () => {
      newCategory.parentId = null;
      await expect(new Category(newCategory).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if title is invalid', async () => {
      newCategory.title = '';
      await expect(new Category(newCategory).validate()).rejects.toThrow();
    });

    test('should throw a validation error if parentId is invalid', async () => {
      newCategory.parentId = 'invalid';
      await expect(new Category(newCategory).validate()).rejects.toThrow();
    });

    test('should throw a validation error if subCategories is invalid', async () => {
      newCategory.subCategories = 'invalid';
      await expect(new Category(newCategory).validate()).rejects.toThrow();
    });
  });
});
