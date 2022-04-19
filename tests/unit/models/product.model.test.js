const faker = require('faker');
const mongoose = require('mongoose');
const { Product } = require('../../../src/models');

describe('Product Model', () => {
  describe('Product Validation', () => {
    let newProduct;
    beforeEach(() => {
      newProduct = {
        category: [mongoose.Types.ObjectId()],
        title: faker.commerce.productName(),
        thumbnail: faker.image.imageUrl(),
        brand: faker.company.companyName(),
        country: mongoose.Types.ObjectId(),
        description: faker.lorem.paragraph(2),
        warrantyMonth: faker.datatype.number(),
        tags: [faker.lorem.word()],
        variants: [mongoose.Types.ObjectId()],
      };
    });

    test('should correctly validate a valid product', async () => {
      await expect(new Product(newProduct).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if title is invalid', async () => {
      newProduct.title = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if thumbnail is invalid', async () => {
      newProduct.thumbnail = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if brand is invalid', async () => {
      newProduct.brand = '';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if country is invalid', async () => {
      newProduct.country = 'invalid';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if warrantyMonth is invalid', async () => {
      newProduct.warrantyMonth = 'invalid';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if tags is invalid', async () => {
      delete newProduct.tags;
      newProduct.tags = 'invalid';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if variants is invalid', async () => {
      newProduct.variants = 'invalid';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });

    test('should throw a validation error if category is invalid', async () => {
      newProduct.category = 'invalid';
      await expect(new Product(newProduct).validate()).rejects.toThrow();
    });
  });
});
