const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const cartRoute = require('./cart.route');
const couponRoute = require('./coupon.route');
const countryRoute = require('./country.route');
const addressRoute = require('./address.route');
const productRoute = require('./product.route');
const docsRoute = require('./docs.route');
const wishlistRoute = require('./wishlist.route');

const attributeRoute = require('./attribute.route');

const bannerRoute = require('./banner.route');

const brandRoute = require('./brand.route');

// const cartRoute = require('./cart.route');
const orderRoute = require('./order.route');
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
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/attributes',
    route: attributeRoute,
  },

  {
    path: '/banners',
    route: bannerRoute,
  },

  {
    path: '/carts',
    route: cartRoute,
  },
  // TODO: Add swagger and spell check

  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/brands',
    route: brandRoute,
  },
  {
    path: '/coupons',
    route: couponRoute,
  },
  // {
  //   path: '/wishlists',
  //   route: wishlistRoute,
  // },

  // {
  //   path: 'skus',
  //   route: skuRoute,
  // },
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
