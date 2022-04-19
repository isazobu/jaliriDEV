const faker = require('faker');
const mongoose = require('mongoose');
const { Wishlist } = require('../../../src/models');

describe('Wishlist model', () => {
  describe('Wishlist validation', () => {
    let newWishlist;
    beforeEach(() => {
      newWishlist = {
        products: [mongoose.Types.ObjectId()],
        user: mongoose.Types.ObjectId(),
        country: 'US',
      };
    });

    test('should correctly validate a valid wishlist', async () => {
      await expect(new Wishlist(newWishlist).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if products is invalid', async () => {
      newWishlist.products = ['invalid'];
      await expect(new Wishlist(newWishlist).validate()).rejects.toThrow();
    });

    test('should throw a validation error if user is invalid', async () => {
      newWishlist.user = 'invalid';
      await expect(new Wishlist(newWishlist).validate()).rejects.toThrow();
    });

    test('should throw a validation error if country is invalid', async () => {
      newWishlist.country = '';
      await expect(new Wishlist(newWishlist).validate()).rejects.toThrow();
    });
  });
});
