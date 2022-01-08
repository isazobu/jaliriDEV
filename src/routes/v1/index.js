const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');

const colorRoute = require('./color.route');
const sizeRoute = require('./size.route');
const skuRoute = require('./sku.route');
const countryRoute = require('./country.route');
const addressRoute = require('./address.route');
const productRoute = require('./product.route');
const docsRoute = require('./docs.route');
// const cartRoute = require('./cart.route');
// const orderRoute = require('./order.route');
// const paymentRoute = require('./payment.route');
// const shippingRoute = require('./shipping.route');
// const reviewRoute = require('./review.route');
// const orderDetailRoute = require('./orderDetail.route');
// const orderStatusRoute = require('./orderStatus.route');
// const orderHistoryRoute = require('./orderHistory.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/categories',
    route: categoryRoute,
  },
  // TODO: Add swagger and spell check
  {
    path: '/products',
    route: productRoute,
  },
  // TODO: Add swagger and spell check
  {
    path: '/addresses',
    route: addressRoute,
  },
  // TODO: Add swagger and spell check
  {
    path: '/countries',
    route: countryRoute,
  },
  // TODO: Add swagger and spell check
  {
    path: '/colors',
    route: colorRoute,
  },
  // TODO: Add swagger and spell check
  {
    path: '/sizes',
    route: sizeRoute,
  },
  {
    path: '/skus',
    route: skuRoute,
  },
  // {
  //   path: 'skus',
  //   route: skuRoute,
  // },

  // {
  //   path: '/orders',
  //   routes: orderRoute,
  // },
  {
    path: '/docs',
    route: docsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
