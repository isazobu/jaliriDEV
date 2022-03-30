const faker = require('faker');
const mongoose = require('mongoose');
const { Banner } = require('../../../src/models');

describe('Banner model', () => {
  describe('Banner validation', () => {
    let newBanner;
    beforeEach(() => {
      newBanner = {
        title: faker.name.findName(),
        field: faker.name.findName(),
        target: faker.name.findName(),
        category: mongoose.Types.ObjectId(),
        image: faker.name.findName(),
        url: faker.name.findName(),
      };
    });

    test('should correctly validate a valid banner', async () => {
      await expect(new Banner(newBanner).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if title is invalid', async () => {
      newBanner.title = '';
      await expect(new Banner(newBanner).validate()).rejects.toThrow();
    });

    test('should throw a validation error if field is invalid', async () => {
      newBanner.field = '';
      await expect(new Banner(newBanner).validate()).rejects.toThrow();
    });

    test('should throw a validation error if target is invalid', async () => {
      newBanner.target = '';
      await expect(new Banner(newBanner).validate()).rejects.toThrow();
    });

    test('should throw a validation error if category is invalid', async () => {
      newBanner.category = '';
      await expect(new Banner(newBanner).validate()).rejects.toThrow();
    });

    test('should throw a validation error if image is invalid', async () => {
      newBanner.image = '';
      await expect(new Banner(newBanner).validate()).rejects.toThrow();
    });

    test('should throw a validation error if url is invalid', async () => {
      newBanner.url = '';
      await expect(new Banner(newBanner).validate()).rejects.toThrow();
    });

    // test('should correctly slugify the title', async () => {
    //   newBanner.title = 'Banner Title';
    //   await expect(new Banner(newBanner).validate()).tohaveProperty('slug', 'banner-title');
    // });
  });
});
