const mongoose = require('mongoose');
const { Product } = require('../../src/models');
const { insertCategories, categoryOne } = require('./category.fixture');
const { insertCountries, countryOne } = require('./country.fixture');

const productOne = {
  _id: mongoose.Types.ObjectId(),
  category: categoryOne._id,
  productId: '3bb42fc3-d582-4847-89a8-c21de3927c0a',
  title: 'Fantastic Granite Soap',
  description:
    'eiusmod dolore ut quis eiusmod amet laboris voluptate ad laborum consequat deserunt magna ipsum tempor minim incididunt',
  thumbnail: 'https://picsum.photos/200/300',
  brand: 'H.J. Heinz',
  warrantyMonth: '24',
  country: countryOne._id,
  tags: ['n'],
  variants: [
    {
      sku: 253671,
      barcode: 486183,
      attributes: [
        {
          name: 'Color',
          value: 'tan',
          isActive: true,
        },
      ],
      kg: 3,
      dimension: {
        width: 3,
        height: 91,
        depth: 90,
      },
      image: ['https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'FJD',
        sellingPrice: {
          text: '$59.41',
          value: 82,
        },
        discountExist: false,
        discountedPrice: {
          text: '$80.74',
          value: 34,
        },
        originalPrice: {
          text: '$54.37',
          value: 68,
        },
        discountAmount: {
          text: '$70.97',
          value: 81,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$48.27',
          value: 93,
        },
      },
      freeShipping: false,
      hasStock: true,
      totalStock: 58,
    },
    {
      sku: 215231,
      barcode: 338926,
      attributes: [
        {
          name: 'Size',
          value: 'lime',
          isActive: true,
        },
      ],
      kg: 1,
      dimension: {
        width: 98,
        height: 84,
        depth: 49,
      },
      image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'ERN',
        sellingPrice: {
          text: '$56.94',
          value: 3,
        },
        discountExist: true,
        discountedPrice: {
          text: '$49.55',
          value: 3,
        },
        originalPrice: {
          text: '$78.07',
          value: 68,
        },
        discountAmount: {
          text: '$75.81',
          value: 52,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$95.76',
          value: 97,
        },
      },
      freeShipping: true,
      hasStock: true,
      totalStock: 67,
    },
    {
      sku: 444651,
      barcode: 407596,
      attributes: [
        {
          name: 'Size',
          value: 'salmon',
          isActive: false,
        },
      ],
      kg: 2,
      dimension: {
        width: 37,
        height: 52,
        depth: 7,
      },
      image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'SZL',
        sellingPrice: {
          text: '$20.30',
          value: 79,
        },
        discountExist: true,
        discountedPrice: {
          text: '$58.50',
          value: 93,
        },
        originalPrice: {
          text: '$14.32',
          value: 76,
        },
        discountAmount: {
          text: '$42.71',
          value: 5,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$76.06',
          value: 8,
        },
      },
      freeShipping: false,
      hasStock: true,
      totalStock: 46,
    },
    {
      sku: 414186,
      barcode: 314586,
      attributes: [
        {
          name: 'Size',
          value: 'violet',
          isActive: false,
        },
      ],
      kg: 2,
      dimension: {
        width: 80,
        height: 22,
        depth: 17,
      },
      image: ['https://picsum.photos/200/300'],
      isActive: false,
      price: {
        currency: 'MXN',
        sellingPrice: {
          text: '$81.52',
          value: 28,
        },
        discountExist: true,
        discountedPrice: {
          text: '$5.38',
          value: 88,
        },
        originalPrice: {
          text: '$47.15',
          value: 64,
        },
        discountAmount: {
          text: '$80.99',
          value: 99,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$59.46',
          value: 11,
        },
      },
      freeShipping: true,
      hasStock: false,
      totalStock: 76,
    },
    {
      sku: 192307,
      barcode: 412687,
      attributes: [
        {
          name: 'Size',
          value: 'maroon',
          isActive: true,
        },
      ],
      kg: 1,
      dimension: {
        width: 1,
        height: 18,
        depth: 58,
      },
      image: ['https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'VEF',
        sellingPrice: {
          text: '$37.43',
          value: 52,
        },
        discountExist: false,
        discountedPrice: {
          text: '$52.22',
          value: 33,
        },
        originalPrice: {
          text: '$11.55',
          value: 8,
        },
        discountAmount: {
          text: '$13.45',
          value: 17,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$15.85',
          value: 80,
        },
      },
      freeShipping: true,
      hasStock: true,
      totalStock: 27,
    },
    {
      sku: 292968,
      barcode: 369074,
      attributes: [
        {
          name: 'Color',
          value: 'silver',
          isActive: true,
        },
      ],
      kg: 2,
      dimension: {
        width: 72,
        height: 16,
        depth: 75,
      },
      image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'MGA',
        sellingPrice: {
          text: '$56.15',
          value: 42,
        },
        discountExist: true,
        discountedPrice: {
          text: '$36.14',
          value: 9,
        },
        originalPrice: {
          text: '$69.78',
          value: 75,
        },
        discountAmount: {
          text: '$43.21',
          value: 98,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$5.97',
          value: 88,
        },
      },
      freeShipping: true,
      hasStock: false,
      totalStock: 53,
    },
    {
      sku: 111437,
      barcode: 196273,
      attributes: [
        {
          name: 'Size',
          value: 'blue',
          isActive: true,
        },
        {
          name: 'Color',
          value: 'gold',
          isActive: true,
        },
        {
          name: 'Color',
          value: 'violet',
          isActive: true,
        },
      ],
      kg: 2,
      dimension: {
        width: 20,
        height: 90,
        depth: 42,
      },
      image: ['https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'SDG',
        sellingPrice: {
          text: '$79.50',
          value: 29,
        },
        discountExist: true,
        discountedPrice: {
          text: '$71.96',
          value: 4,
        },
        originalPrice: {
          text: '$22.93',
          value: 25,
        },
        discountAmount: {
          text: '$78.90',
          value: 0,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$39.16',
          value: 65,
        },
      },
      freeShipping: false,
      hasStock: true,
      totalStock: 24,
    },
    {
      sku: 263297,
      barcode: 411399,
      attributes: [
        {
          name: 'Size',
          value: 'magenta',
          isActive: false,
        },
        {
          name: 'Size',
          value: 'purple',
          isActive: false,
        },
      ],
      kg: 2,
      dimension: {
        width: 74,
        height: 68,
        depth: 98,
      },
      image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'TOP',
        sellingPrice: {
          text: '$9.57',
          value: 38,
        },
        discountExist: true,
        discountedPrice: {
          text: '$12.71',
          value: 17,
        },
        originalPrice: {
          text: '$25.22',
          value: 20,
        },
        discountAmount: {
          text: '$5.46',
          value: 21,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$24.23',
          value: 3,
        },
      },
      freeShipping: false,
      hasStock: false,
      totalStock: 51,
    },
    {
      sku: 189102,
      barcode: 155239,
      attributes: [
        {
          name: 'Size',
          value: 'white',
          isActive: true,
        },
        {
          name: 'Size',
          value: 'violet',
          isActive: true,
        },
        {
          name: 'Size',
          value: 'indigo',
          isActive: true,
        },
      ],
      kg: 1,
      dimension: {
        width: 28,
        height: 28,
        depth: 15,
      },
      image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      isActive: false,
      price: {
        currency: 'GTQ',
        sellingPrice: {
          text: '$99.95',
          value: 59,
        },
        discountExist: false,
        discountedPrice: {
          text: '$93.06',
          value: 42,
        },
        originalPrice: {
          text: '$10.88',
          value: 45,
        },
        discountAmount: {
          text: '$63.82',
          value: 1,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$80.26',
          value: 17,
        },
      },
      freeShipping: true,
      hasStock: false,
      totalStock: 40,
    },
    {
      sku: 228389,
      barcode: 306448,
      attributes: [
        {
          name: 'Size',
          value: 'plum',
          isActive: true,
        },
      ],
      kg: 2,
      dimension: {
        width: 36,
        height: 43,
        depth: 83,
      },
      image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'BAM',
        sellingPrice: {
          text: '$22.84',
          value: 12,
        },
        discountExist: false,
        discountedPrice: {
          text: '$11.71',
          value: 26,
        },
        originalPrice: {
          text: '$47.66',
          value: 73,
        },
        discountAmount: {
          text: '$70.74',
          value: 21,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$86.71',
          value: 66,
        },
      },
      freeShipping: false,
      hasStock: false,
      totalStock: 88,
    },
    {
      sku: 194349,
      barcode: 303784,
      attributes: [
        {
          name: 'Color',
          value: 'olive',
          isActive: true,
        },
      ],
      kg: 2,
      dimension: {
        width: 22,
        height: 93,
        depth: 24,
      },
      image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      isActive: true,
      price: {
        currency: 'TMT',
        sellingPrice: {
          text: '$51.25',
          value: 92,
        },
        discountExist: true,
        discountedPrice: {
          text: '$4.21',
          value: 98,
        },
        originalPrice: {
          text: '$27.54',
          value: 77,
        },
        discountAmount: {
          text: '$73.05',
          value: 82,
        },
        discountedType: 'fixed',
        shippingPrice: {
          text: '$89.75',
          value: 9,
        },
      },
      freeShipping: true,
      hasStock: false,
      totalStock: 87,
    },
  ],
};

const insertProducts = async (products) => {
  await insertCategories([categoryOne]);
  await insertCountries([countryOne]);
  await Product.insertMany(products);
};

module.exports = {
  productOne,
  insertProducts,
};
