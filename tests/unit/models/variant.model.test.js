const faker = require('faker');
const mongoose = require('mongoose');
const { Variant } = require('../../../src/models');

describe('Variant model', () => {
  let newVariant;
  let priceSchmema;
  let mockPrice;
  beforeEach(() => {
    priceSchmema = {
      value: faker.datatype.number(),
      text: faker.random.word(),
    };
    mockPrice = {
      currency: faker.random.word(),
      sellingPrice: priceSchmema,
      discountExist: faker.datatype.boolean(),
      discountedPrice: priceSchmema,
      originalPrice: priceSchmema,
      discountAmount: priceSchmema,
      shippingPrice: priceSchmema,
      totalPrice: priceSchmema,
    };
    newVariant = {
      sku: faker.random.word(),
      barcode: faker.random.word(),
      product: mongoose.Types.ObjectId(),
      attributes: [
        {
          name: faker.random.word(),
          value: faker.random.word(),
        },
      ],
      kg: faker.datatype.number(),
      dimension: {
        width: faker.datatype.number(),
        height: faker.datatype.number(),
        depth: faker.datatype.number(),
      },
      image: [faker.random.word()],
      totalStock: 15,
    };

    newVariant.price = mockPrice;
  });
  describe('Variant validation', () => {
    test('should correctly validate a valid variant', async () => {
      await expect(new Variant(newVariant).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if sku is invalid', async () => {
      newVariant.sku = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if barcode is invalid', async () => {
      newVariant.barcode = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if product is invalid', async () => {
      newVariant.product = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if kg is invalid', async () => {
      newVariant.kg = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if totalStock is invalid', async () => {
      newVariant.totalStock = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if price is invalid', async () => {
      newVariant.price = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });
  });

  describe('Variant attribute validation', () => {
    test('should throw a validation error if attributes is invalid', async () => {
      newVariant.attributes = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if name is invalid', async () => {
      newVariant.attributes[0].name = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if value is invalid', async () => {
      newVariant.attributes[0].value = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });
  });

  describe('Variant dimension validation', () => {
    test('should throw a validation error if width is invalid', async () => {
      newVariant.dimension.width = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if height is invalid', async () => {
      newVariant.dimension.height = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if depth is invalid', async () => {
      newVariant.dimension.depth = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });
  });

  describe('Variant price validation', () => {
    test('should throw a validation error if currency is invalid', async () => {
      newVariant.price.currency = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if sellingPrice is invalid', async () => {
      newVariant.price.sellingPrice = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if discountExist is invalid', async () => {
      newVariant.price.discountExist = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if discountedPrice is invalid', async () => {
      newVariant.price.discountedPrice = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if originalPrice is invalid', async () => {
      newVariant.price.originalPrice = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if discountAmount is invalid', async () => {
      newVariant.price.discountAmount = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if shippingPrice is invalid', async () => {
      newVariant.price.shippingPrice = '';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });

    test('should throw a validation error if totalPrice is invalid', async () => {
      newVariant.price.totalPrice = 'invalid';
      await expect(new Variant(newVariant).validate()).rejects.toThrow();
    });
  });
});
