const request = require('supertest');
const faker = require('faker');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');

const { userOneAccessToken } = require('../fixtures/token.fixture');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { insertProducts, productOne } = require('../fixtures/product.fixture');
const { User } = require('../../src/models');

setupTestDB();

describe('Cart routes', () => {
  describe('GET /carts', () => {
    test('should return 200', async () => {
      await insertUsers([userOne]);
      const response = await request(app)
        .get('/api/v1/carts')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(response.body).toBeDefined();
    });
    test('should return 401 if access token is missing', async () => {
      await request(app).get('/api/v1/carts').send().expect(httpStatus.UNAUTHORIZED);
    });
    // TODO: add test for detail field
  });

  describe('POST /api/v1/carts', () => {
    let items;
    beforeEach(() => {
      items = [
        {
          sku: productOne.variants[0].sku.toString(),
          quantity: 1,
        },
      ];
    });
    test('should return 201 and successfully create new user if data is ok', async () => {
      await insertUsers([userOne]);
      await insertProducts(productOne);

      const response = await request(app)
        .post('/api/v1/carts')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({ items })
        .expect(httpStatus.CREATED);

      expect(response.body).toBeDefined();
      response.body.items.forEach((item) => {
        item.product = new mongoose.Types.ObjectId(item.product);
      });

      const { cart } = await User.findById(userOne._id).select('cart').lean();
      expect(cart).toBeDefined();
      expect(cart).toMatchObject(response.body);
    });
  });
});
