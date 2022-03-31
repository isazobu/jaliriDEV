const faker = require('faker');
const { Brand } = require('../../../src/models');

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
});
