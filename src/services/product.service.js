const httpStatus = require('http-status');
const mongoose = require('mongoose');

const { Product, Category, Country } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */

const createProduct = async (productBody) => {
  const productCountry = await Country.getCountryByCode(productBody.country);

  if (!productCountry) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Country not found');
  }

  const productCategory = await Category.findOne({ title: productBody.category });
  if (productCategory) {
    productBody.category = productCategory._id;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
  }

  if (await Product.isProductExist(productBody.title, productBody.country)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already exist');
  }

  return Product.create(productBody);
};

const getProductBySku = async (sku) => {
  const product = await Product.aggregate().unwind('variants').match({ 'variants.sku': sku }).exec();
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product[0];
};

const getVariants = async (sku) => {
  const skuProduct = await getProductBySku(sku);
  const color = skuProduct.variants.attributes.filter((attribute) => attribute.name === 'Color')[0]?.value || '';
  const product = Product.aggregate([
    {
      $match: {
        'variants.sku': sku,
      },
    },
    {
      $project: {
        variants: 1,
      },
    },
    {
      $unwind: '$variants',
    },
    {
      $match: {
        'variants.attributes.value': { $regex: color, $options: 'i' },
      },
    },
    {
      $replaceRoot: {
        newRoot: '$variants',
      },
    },
  ]);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return product;
};

const getAllSizeByColorWithSku = async (sku) => {
  const skuProduct = await getProductBySku(sku);
  const color = skuProduct.variants.attributes.filter((attribute) => attribute.name === 'Color')[0].value || '';
  const size = Product.aggregate([
    {
      $match: {
        'variants.sku': sku,
      },
    },
    {
      $project: {
        'variants.attributes.name': 1,
        'variants.attributes.value': 1,
      },
    },
    {
      $unwind: '$variants',
    },
    {
      $match: {
        'variants.attributes.value': { $regex: color, $options: 'i' },
      },
    },

    {
      $unwind: '$variants.attributes',
    },
    {
      $match: {
        'variants.attributes.name': 'Size',
      },
    },
    {
      $replaceRoot: {
        newRoot: '$variants.attributes',
      },
    },
    { $sort: { value: 1 } },
  ]).exec();

  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }

  return size;
};

// Create many products
const createManyProducts = async (products) => {
  const productsCreated = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productCountry = await Country.getCountryByCode(product.country);
    if (productCountry) {
      product.country = productCountry._id;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Country not found');
    }
    const productCategory = await Category.findOne({ title: product.category });
    if (productCategory) {
      product.category = productCategory._id;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
    }
    productsCreated.push(Product.create(product));
  }
  return Promise.all(productsCreated);
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - ®Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */

const queryProducts = async (filter, options) => {
  const products = await Product.productFiltering(filter, options);
  //   return products;
  // };

  // if (filter.category) {
  //   criteria['category.title'] = filter.category;
  // }
  // if (filter.country) {
  //   criteria['country.code'] = filter.country;
  // }

  // const products = await Product.aggregate([
  //   {
  //     $lookup: {
  //       from: 'categories',
  //       localField: 'category',
  //       foreignField: '_id',
  //       as: 'category',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'countries',
  //       localField: 'country',
  //       foreignField: '_id',
  //       as: 'country',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'attributes',
  //       localField: 'variants.attributes',
  //       foreignField: '_id',
  //       as: 'variants.attributes',
  //     },
  //   },
  //   {
  //     $sort: {
  //       'variants.price.sellingPrice': 1,
  //     },
  //   },

  //   {
  //     $match: criteria,
  //   },
  // ])
  //   .sort('-variants.price.sellingPrice.value')
  //   .limit(options.limit)
  //   .skip(options.skip).;

  return products;
};

/**
 * Get user by id
 * @pararem {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  const product = await Product.findById(id).populate('category').populate('country');
  return product;
};

const getProductsByProductId = async (productId) => {
  const products = await Product.find({ productId });
  return products;
};

const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (updateBody.title && (await Product.isProductExist(updateBody.title))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already taken');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Address>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

const getManySku = async (skus) => {
  const skuProducts = await Product.aggregate()
    .unwind('variants')
    .match({
      'variants.sku': { $in: skus },
    })
    .exec();
  return skuProducts;
};

const filterProductMenu = async () => {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$variants',
      },
    },
    {
      $unwind: {
        path: '$variants.attributes',
      },
    },
    {
      $facet: {
        result: [
          {
            $group: {
              _id: { name: '$variants.attributes.name', value: '$variants.attributes.value' },
              products: {
                $addToSet: '$_id',
              },
            },
          },
          {
            $project: {
              'filter.value': '$_id.value',
              'filter.count': { $size: '$products' },
            },
          },
          {
            $group: {
              _id: { $toLower: '$_id.name' },
              filters: { $push: '$filter' },
            },
          },
          {
            $unwind: {
              path: '$_id',
            },
          },
        ],
        brand: [
          {
            $group: {
              _id: { name: 'brand', brand: '$brand' },
              products: {
                $addToSet: '$_id',
              },
            },
          },
          {
            $project: {
              'filter.value': '$_id.brand',
              'filter.count': { $size: '$products' },
            },
          },
          {
            $group: {
              _id: '$_id.name',
              filters: { $push: '$filter' },
            },
          },
        ],

        category: [
          {
            $group: {
              _id: { name: 'category', category: '$category' },
              products: {
                $addToSet: '$_id',
              },
            },
          },
          {
            $project: {
              '_id.name': 1,
              '_id.category.title': 1,
              products: 1,
            },
          },
          {
            $unwind: {
              path: '$_id.category',
            },
          },
          {
            $project: {
              'filter.value': '$_id.category.title',
              'filter.count': { $size: '$products' },
            },
          },
          {
            $group: {
              _id: '$_id.name',
              filters: { $push: '$filter' },
            },
          },
        ],
      },
    },
    {
      $project: {
        results: {
          $concatArrays: ['$result', '$brand', '$category'],
        },
      },
    },
  ]);
  return products[0];
};

module.exports = {
  createProduct,
  createManyProducts,
  queryProducts,
  getProductBySku,
  getManySku,
  getVariants,
  getProductById,
  getProductsByProductId,
  updateProductById,
  deleteProductById,
  getAllSizeByColorWithSku,
  filterProductMenu,
};
