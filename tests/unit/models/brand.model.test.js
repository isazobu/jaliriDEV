const faker = require('faker');
const { Brand } = require('../../../src/models');
const { brandPreSave } = require('../../../src/models/brand.model');

describe('Brand model', () => {
  describe('Brand validation', () => {
    let newBrand;
    beforeEach(() => {
      newBrand = {
        name: faker.name.findName(),
      };
    });

    test('should correctly validate a valid brand', async () => {
      await expect(new Brand(newBrand).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if name is invalid', async () => {
      newBrand.name = '';
      await expect(new Brand(newBrand).validate()).rejects.toThrow();
    });
  });

  describe('Brand preSave', () => {
    test('should correctly slugify the name', async () => {
      const newBrand = {
        name: 'Brand Name',
      };
      const brand = new Brand(newBrand);
      const mNext = jest.fn();
      brandPreSave.call(brand, mNext);
      expect(brand.slug).toBeDefined();
      expect(brand.slug).toBe('brand-name');
    });

    test('should correctly capitalize the first letters of name', async () => {
      const newBrand = {
        name: 'brand name',
      };
      const brand = new Brand(newBrand);
      const mNext = jest.fn();
      brandPreSave.call(brand, mNext);
      expect(brand.name).toBeDefined();
      expect(brand.name).toBe('Brand Name');
    });
  });
});
