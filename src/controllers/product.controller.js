const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, countryService, orderService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const productItem = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(productItem);
});

const createManyProducts = catchAsync(async (req, res) => {
  const productItems = await productService.createManyProducts(req.body);
  res.status(httpStatus.CREATED).send(productItems);
});

const getVariants = catchAsync(async (req, res) => {
  const { skuId } = req.params;

  const variants = await productService.getVariants(skuId);
  res.status(httpStatus.OK).send(variants);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.status(httpStatus.OK).send(product);
});

const getProductBySku = catchAsync(async (req, res) => {
  const product = await productService.getProductBySku(req.params.skuId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.status(httpStatus.OK).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'q', // search query key
    'productId',
    'title',
    'discountExist',
    'price',
    'category',
    'brand',
    'size',
    'color',
  ]);
  // append filter array from header country
  if (req.headers.country) {
    const country = await countryService.getCountryByCode(req.headers.country);
    if (country) {
      filter.country = req.headers.country;
    } else {
      res.status(httpStatus.NOT_FOUND).send('Country not found');
    }
  } else {
    res.status(httpStatus.NOT_FOUND).send('Country not found');
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await productService.queryProducts(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getAllSizeByColorWithSku = catchAsync(async (req, res) => {
  const { skuId } = req.params;

  const result = await productService.getAllSizeByColorWithSku(skuId);
  res.status(httpStatus.OK).send(result);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getManySku = catchAsync(async (req, res) => {
  const { skuIds } = req.body;
  const products = await productService.getManySku(skuIds);
  res.status(httpStatus.OK).send(products);
});

const filterProductMenu = catchAsync(async (req, res) => {
  const result = await productService.filterProductMenu();
  res.status(httpStatus.OK).send(result);
});

const getProductSales = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await productService.getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  let productDailySales = 0;
  let productMonthlySales = 0;
  let productYearlySales = 0;
  const lastYearDate = new Date().setFullYear(new Date().getFullYear() - 1);
  const lastMonthDate = new Date().setMonth(new Date().getMonth() - 1);
  const yesterday = new Date().setDate(new Date().getDate() - 1);
  const queryOptions = {
    'cart.items._id': productId,
    status: { $in: ['Processing', 'Shipped', 'Delivered'] },
    dateOrdered: { $gte: lastYearDate },
  };
  const filter = { cart: 1, dateOrdered: 1, id: 0 };

  const lastYearOrders = await orderService.getOrdersByStatus(queryOptions, filter);
  const lastMonthOrders = await lastYearOrders.filter((order) => order.dateOrdered >= lastMonthDate);
  const yesterdayOrders = await lastYearOrders.filter((order) => order.dateOrdered >= yesterday);

  for (let i = 0; i < lastYearOrders.length; i += 1) {
    if (i < lastMonthOrders.length) {
      /** Calculate monthly sales */
      const matchedProduct = lastMonthOrders.cart.find((item) => item._id.toString() === productId.toString());
      productMonthlySales += matchedProduct.quantity;
    }

    if (i < yesterdayOrders.length) {
      /** Calculate daily sales */
      const matchedProduct = yesterdayOrders.cart.find((item) => item._id.toString() === productId.toString());
      productDailySales += matchedProduct.quantity;
    }

    /** Calculate yearly sales */
    const matchedProduct = lastYearOrders.cart.find((item) => item._id.toString() === productId.toString());
    productYearlySales += matchedProduct.quantity;
  }

  res.json({
    productDailySales,
    productMonthlySales,
    productYearlySales,
  });
});

module.exports = {
  createProduct,
  createManyProducts,
  getProductBySku,
  getProducts,
  getVariants,
  getProduct,
  updateProduct,
  getManySku,
  deleteProduct,
  getAllSizeByColorWithSku,
  filterProductMenu,
  getProductSales,
};
