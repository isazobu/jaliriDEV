// Product.json JSON insert to db

const mongoose = require('mongoose');
const Product = require('../models/product.model.js');

mongoose.connect('mongodb+srv://isa:xh1Sjt8qaOkkIBm0@cluster1.luz0y.mongodb.net/jaliri?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Product.insert([
  {
    category: '61e5a2045f050f002148eff1',
    productId: '20057bd3-a9df-4aaa-9271-6bed3a99dc35',
    title: 'Rustic Fresh Soap',
    description: 'eiusmod quis nulla nulla labore sit consectetur qui laboris esse reprehenderit non',
    thumbnail: 'https://picsum.photos/200/300',
    brand: 'TrueBlue',
    warrantyMonth: '24',
    country: '61e5a2485f050f002148eff7',
    tags: ['non ex', 'adip', 'Lorem adi'],
    variants: [
      {
        sku: 159464,
        barcode: 116488,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 32,
            isActive: true,
          },
        ],
        kg: 1,
        dimension: {
          width: 38,
          height: 23,
          depth: 61,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'SHP',
          sellingPrice: {
            text: '$34.90',
            value: 92,
          },
          discountExist: false,
          discountedPrice: {
            text: '$83.32',
            value: 28,
          },
          originalPrice: {
            text: '$95.52',
            value: 72,
          },
          discountAmount: {
            text: '$0.94',
            value: 53,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$80.76',
            value: 87,
          },
        },
        freeShipping: true,
        hasStock: true,
        totalStock: 47,
      },
      {
        sku: 242805,
        barcode: 181734,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 35,
            isActive: true,
          },
        ],
        kg: 3,
        dimension: {
          width: 69,
          height: 12,
          depth: 44,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'BOB',
          sellingPrice: {
            text: '$57.78',
            value: 29,
          },
          discountExist: false,
          discountedPrice: {
            text: '$15.82',
            value: 31,
          },
          originalPrice: {
            text: '$46.65',
            value: 42,
          },
          discountAmount: {
            text: '$64.45',
            value: 41,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$8.54',
            value: 5,
          },
        },
        freeShipping: true,
        hasStock: true,
        totalStock: 98,
      },
      {
        sku: 318539,
        barcode: 329577,
        attributes: [
          {
            name: 'Color',
            value: 'Yellow',
            isActive: true,
          },
          {
            name: 'Size',
            value: 40,
            isActive: true,
          },
        ],
        kg: 2,
        dimension: {
          width: 55,
          height: 38,
          depth: 67,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'UGX',
          sellingPrice: {
            text: '$84.10',
            value: 92,
          },
          discountExist: false,
          discountedPrice: {
            text: '$29.27',
            value: 97,
          },
          originalPrice: {
            text: '$46.04',
            value: 28,
          },
          discountAmount: {
            text: '$21.76',
            value: 72,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$81.73',
            value: 20,
          },
        },
        freeShipping: false,
        hasStock: false,
        totalStock: 67,
      },
      {
        sku: 384774,
        barcode: 233204,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 34,
            isActive: true,
          },
        ],
        kg: 3,
        dimension: {
          width: 89,
          height: 80,
          depth: 83,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: false,
        price: {
          currency: 'VEF',
          sellingPrice: {
            text: '$25.46',
            value: 38,
          },
          discountExist: true,
          discountedPrice: {
            text: '$87.62',
            value: 19,
          },
          originalPrice: {
            text: '$39.27',
            value: 38,
          },
          discountAmount: {
            text: '$66.61',
            value: 56,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$99.89',
            value: 7,
          },
        },
        freeShipping: true,
        hasStock: false,
        totalStock: 43,
      },
      {
        sku: 358503,
        barcode: 247393,
        attributes: [
          {
            name: 'Color',
            value: 'Brown',
            isActive: true,
          },
          {
            name: 'Size',
            value: 31,
            isActive: true,
          },
        ],
        kg: 1,
        dimension: {
          width: 16,
          height: 64,
          depth: 94,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: false,
        price: {
          currency: 'GIP',
          sellingPrice: {
            text: '$14.29',
            value: 91,
          },
          discountExist: false,
          discountedPrice: {
            text: '$61.33',
            value: 33,
          },
          originalPrice: {
            text: '$38.30',
            value: 20,
          },
          discountAmount: {
            text: '$15.92',
            value: 98,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$13.35',
            value: 76,
          },
        },
        freeShipping: false,
        hasStock: false,
        totalStock: 41,
      },
      {
        sku: 119077,
        barcode: 459175,
        attributes: [
          {
            name: 'Color',
            value: 'Brown',
            isActive: true,
          },
          {
            name: 'Size',
            value: 43,
            isActive: true,
          },
        ],
        kg: 1,
        dimension: {
          width: 28,
          height: 70,
          depth: 64,
        },
        image: ['https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'PKR',
          sellingPrice: {
            text: '$90.95',
            value: 94,
          },
          discountExist: true,
          discountedPrice: {
            text: '$96.53',
            value: 4,
          },
          originalPrice: {
            text: '$54.19',
            value: 57,
          },
          discountAmount: {
            text: '$80.45',
            value: 79,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$83.61',
            value: 91,
          },
        },
        freeShipping: true,
        hasStock: false,
        totalStock: 60,
      },
      {
        sku: 235402,
        barcode: 386675,
        attributes: [
          {
            name: 'Color',
            value: 'Brown',
            isActive: true,
          },
          {
            name: 'Size',
            value: 31,
            isActive: true,
          },
        ],
        kg: 1,
        dimension: {
          width: 74,
          height: 27,
          depth: 30,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'VUV',
          sellingPrice: {
            text: '$12.84',
            value: 60,
          },
          discountExist: true,
          discountedPrice: {
            text: '$98.93',
            value: 8,
          },
          originalPrice: {
            text: '$84.17',
            value: 94,
          },
          discountAmount: {
            text: '$50.60',
            value: 83,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$57.88',
            value: 28,
          },
        },
        freeShipping: false,
        hasStock: false,
        totalStock: 53,
      },
      {
        sku: 167542,
        barcode: 156052,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 31,
            isActive: true,
          },
        ],
        kg: 3,
        dimension: {
          width: 22,
          height: 8,
          depth: 7,
        },
        image: ['https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'UYU',
          sellingPrice: {
            text: '$81.60',
            value: 66,
          },
          discountExist: true,
          discountedPrice: {
            text: '$31.76',
            value: 74,
          },
          originalPrice: {
            text: '$62.08',
            value: 29,
          },
          discountAmount: {
            text: '$21.25',
            value: 65,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$71.04',
            value: 61,
          },
        },
        freeShipping: true,
        hasStock: false,
        totalStock: 58,
      },
      {
        sku: 388258,
        barcode: 159145,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 37,
            isActive: true,
          },
        ],
        kg: 1,
        dimension: {
          width: 37,
          height: 33,
          depth: 69,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'LYD',
          sellingPrice: {
            text: '$14.51',
            value: 68,
          },
          discountExist: false,
          discountedPrice: {
            text: '$25.98',
            value: 28,
          },
          originalPrice: {
            text: '$37.17',
            value: 49,
          },
          discountAmount: {
            text: '$69.10',
            value: 58,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$14.65',
            value: 97,
          },
        },
        freeShipping: false,
        hasStock: true,
        totalStock: 27,
      },
      {
        sku: 362661,
        barcode: 382905,
        attributes: [
          {
            name: 'Color',
            value: 'Yellow',
            isActive: true,
          },
          {
            name: 'Size',
            value: 43,
            isActive: false,
          },
        ],
        kg: 3,
        dimension: {
          width: 81,
          height: 43,
          depth: 80,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'HNL',
          sellingPrice: {
            text: '$89.69',
            value: 97,
          },
          discountExist: false,
          discountedPrice: {
            text: '$86.11',
            value: 89,
          },
          originalPrice: {
            text: '$55.59',
            value: 54,
          },
          discountAmount: {
            text: '$33.73',
            value: 54,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$99.53',
            value: 18,
          },
        },
        freeShipping: false,
        hasStock: true,
        totalStock: 59,
      },
      {
        sku: 134401,
        barcode: 483829,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 40,
            isActive: true,
          },
        ],
        kg: 2,
        dimension: {
          width: 35,
          height: 57,
          depth: 15,
        },
        image: ['https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'BTN',
          sellingPrice: {
            text: '$14.11',
            value: 46,
          },
          discountExist: true,
          discountedPrice: {
            text: '$78.77',
            value: 77,
          },
          originalPrice: {
            text: '$55.80',
            value: 65,
          },
          discountAmount: {
            text: '$17.79',
            value: 16,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$50.48',
            value: 83,
          },
        },
        freeShipping: false,
        hasStock: true,
        totalStock: 39,
      },
      {
        sku: 352028,
        barcode: 100772,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 30,
            isActive: true,
          },
        ],
        kg: 2,
        dimension: {
          width: 61,
          height: 14,
          depth: 10,
        },
        image: ['https://picsum.photos/200/300'],
        isActive: false,
        price: {
          currency: 'NAD',
          sellingPrice: {
            text: '$95.32',
            value: 42,
          },
          discountExist: true,
          discountedPrice: {
            text: '$47.32',
            value: 35,
          },
          originalPrice: {
            text: '$53.64',
            value: 57,
          },
          discountAmount: {
            text: '$67.68',
            value: 5,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$34.42',
            value: 58,
          },
        },
        freeShipping: true,
        hasStock: false,
        totalStock: 46,
      },
      {
        sku: 440907,
        barcode: 358617,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: false,
          },
          {
            name: 'Size',
            value: 35,
            isActive: true,
          },
        ],
        kg: 2,
        dimension: {
          width: 77,
          height: 74,
          depth: 98,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: false,
        price: {
          currency: 'AZN',
          sellingPrice: {
            text: '$5.31',
            value: 36,
          },
          discountExist: true,
          discountedPrice: {
            text: '$87.90',
            value: 8,
          },
          originalPrice: {
            text: '$32.88',
            value: 41,
          },
          discountAmount: {
            text: '$19.43',
            value: 51,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$62.78',
            value: 32,
          },
        },
        freeShipping: true,
        hasStock: true,
        totalStock: 26,
      },
      {
        sku: 328808,
        barcode: 388249,
        attributes: [
          {
            name: 'Color',
            value: 'Black',
            isActive: true,
          },
          {
            name: 'Size',
            value: 38,
            isActive: true,
          },
        ],
        kg: 2,
        dimension: {
          width: 81,
          height: 64,
          depth: 45,
        },
        image: ['https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'MAD',
          sellingPrice: {
            text: '$94.52',
            value: 32,
          },
          discountExist: true,
          discountedPrice: {
            text: '$59.65',
            value: 31,
          },
          originalPrice: {
            text: '$82.00',
            value: 53,
          },
          discountAmount: {
            text: '$24.68',
            value: 93,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$22.42',
            value: 43,
          },
        },
        freeShipping: false,
        hasStock: true,
        totalStock: 15,
      },
      {
        sku: 336273,
        barcode: 239617,
        attributes: [
          {
            name: 'Color',
            value: 'Brown',
            isActive: false,
          },
          {
            name: 'Size',
            value: 31,
            isActive: true,
          },
        ],
        kg: 3,
        dimension: {
          width: 83,
          height: 57,
          depth: 14,
        },
        image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
        isActive: true,
        price: {
          currency: 'NIO',
          sellingPrice: {
            text: '$32.49',
            value: 43,
          },
          discountExist: false,
          discountedPrice: {
            text: '$8.30',
            value: 45,
          },
          originalPrice: {
            text: '$4.73',
            value: 29,
          },
          discountAmount: {
            text: '$20.00',
            value: 35,
          },
          discountedType: 'fixed',
          shippingPrice: {
            text: '$92.60',
            value: 80,
          },
        },
        freeShipping: true,
        hasStock: true,
        totalStock: 2,
      },
    ],
  },
])
  .then(function () {
    console.log('Data inserted'); // Success
  })
  .catch(function (error) {
    console.log(error); // Failure
  });
