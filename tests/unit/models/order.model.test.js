/* eslint-disable no-use-before-define */
const faker = require('faker');
const mongoose = require('mongoose');
const { Order } = require('../../../src/models');
const { orderCartSchema, orderItemSchema } = require('../../../src/models/schemas');

describe('Order model', () => {
  describe('Order validation', () => {
    let order;
    beforeEach(() => {
      order = initOrder();
    });

    test('should correctly validate a valid order', async () => {
      await expect(order.validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if orderNo is invalid', async () => {
      order.orderNo = 'invalidOrderNo';
      await expect(new Order(order).validate()).rejects.toThrow();
    });

    test('should throw a validation error if address is null', async () => {
      order.address = null;
      await expect(new Order(order).validate()).rejects.toThrow();
    });

    test('should throw a validation error if cart is empty', async () => {
      order.cart = null;
      await expect(new Order(order).validate()).rejects.toThrow();
    });

    test('should throw a validation error if user is invalid', async () => {
      order.user = 'invalid';
      await expect(new Order(order).validate()).rejects.toThrow();
    });

    test('should throw a validation error if status is invalid', async () => {
      order.status = 'invalid';
      await expect(new Order(order).validate()).rejects.toThrow();
    });

    test('should throw a validation error if dateOrdered is invalid', async () => {
      order.dateOrdered = 'invalid';
      await expect(new Order(order).validate()).rejects.toThrow();
    });

    test('should throw a validation error if expectedDeliveryDate is invalid', async () => {
      order.expectedDeliveryDate = 'invalid';
      await expect(new Order(order).validate()).rejects.toThrow();
    });

    test('should throw a validation error if expectedDeliveryDate is before or equal to dateOrdered', async () => {
      order.expectedDeliveryDate = order.dateOrdered;
      await expect(new Order(order).validate()).rejects.toThrow();
      order.expectedDeliveryDate = faker.date.past();
      order.dateOrdered = faker.date.future();
      await expect(new Order(order).validate()).rejects.toThrow();
    });
  });
});
function initOrder() {
  const newItem = {
    quantity: faker.datatype.number(),
    sku: faker.name.findName(),
    product: mongoose.Types.ObjectId(),
    title: faker.name.findName(),
    brand: faker.name.findName(),
    attributes: [],
    images: [],
    totalDiscount: 0,
    totalSalesPrice: 0,
    totalPrice: 0,
  };
  const newCart = () => {
    return {
      totalPrice: faker.datatype.number(),
      itemsPrice: faker.datatype.number(),
      shippingPrice: faker.datatype.number(),
    };
  };
  const newAddress = {
    fullName: faker.name.findName(),
    addressText: faker.address.streetAddress(),
    city: faker.address.city(),
    area: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
    user: mongoose.Types.ObjectId(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  };
  const newOrder = {
    orderNo: faker.datatype.uuid(),
    address: newAddress,
    user: mongoose.Types.ObjectId(),
    status: 'Pending',
    isPaid: false,
    paidAt: null,
    shipping: faker.commerce.productName(),
    deliveryDate: null,
    message: faker.lorem.sentence(),
    summary: faker.lorem.sentence(),
    expectedDeliveryDate: faker.date.future(),
    tax: 18,
    paymentMethod: 'COD',
    dateOrdered: faker.date.past(),
  };
  const order = new Order(newOrder);
  order.cart = newCart();
  order.cart.items.push(newItem);
  return order;
}
