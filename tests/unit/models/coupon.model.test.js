const faker = require('faker');
const { Coupon } = require('../../../src/models');

describe('Coupon Model', () => {
  describe('Coupon validation', () => {
    let newCoupon;
    beforeEach(() => {
      newCoupon = {
        code: faker.name.findName(),
        title: faker.name.findName(),
        type: 'amount',
        value: 15,
        countryCode: faker.name.findName(),
        specification: 'all',
        users: [],
        startDate: faker.date.past(),
        expireDate: faker.date.future(),
      };
    });

    test('should correctly validate a valid coupon', async () => {
      await expect(new Coupon(newCoupon).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if code is invalid', async () => {
      newCoupon.code = '';
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if type is invalid', async () => {
      newCoupon.type = 'invalid';
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if value is less than 0', async () => {
      newCoupon.value = -1;
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if countryCode is invalid', async () => {
      newCoupon.countryCode = '';
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if specification is invalid', async () => {
      newCoupon.specification = 'invalid';
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if startDate is invalid', async () => {
      newCoupon.startDate = 'invalid';
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if expireDate is invalid', async () => {
      newCoupon.expireDate = '';
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if expireDate is before startDate', async () => {
      newCoupon.startDate = faker.date.future();
      newCoupon.expireDate = faker.date.past();
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });

    test('should throw a validation error if users is invalid', async () => {
      newCoupon.users = ['invalid'];
      await expect(new Coupon(newCoupon).validate()).rejects.toThrow();
    });
  });
});
