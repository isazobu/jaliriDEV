const faker = require('faker');
const { Country } = require('../../../src/models');

describe('Country Model', () => {
  describe('Country validation', () => {
    let newCountry;
    beforeEach(() => {
      newCountry = {
        name: faker.name.findName(),
        code: faker.name.findName(),
        currency: faker.name.findName(),
        currencySymbol: faker.name.findName(),
        flagImage: faker.name.findName(),
      };
    });

    test('should correctly validate a valid country', async () => {
      await expect(new Country(newCountry).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if name is invalid', async () => {
      newCountry.name = '';
      await expect(new Country(newCountry).validate()).rejects.toThrow();
    });

    test('should throw a validation error if code is invalid', async () => {
      newCountry.code = '';
      await expect(new Country(newCountry).validate()).rejects.toThrow();
    });

    test('should throw a validation error if currency is invalid', async () => {
      newCountry.currency = '';
      await expect(new Country(newCountry).validate()).rejects.toThrow();
    });

    test('should throw a validation error if currencySymbol is invalid', async () => {
      newCountry.currencySymbol = '';
      await expect(new Country(newCountry).validate()).rejects.toThrow();
    });

    test('should throw a validation error if flagImage is invalid', async () => {
      newCountry.flagImage = '';
      await expect(new Country(newCountry).validate()).rejects.toThrow();
    });
  });
});
