const allRoles = {
  guest: [],
  user: ['me', 'manageCarts', 'manageOrders'],
  admin: [
    'getUsers',
    'manageOrders',
    'manageSizes',
    'manageColors',
    'manageAddresses',
    'manageUsers',
    'getCategory',
    'manageCategories',
    'manageProducts',
    'manageCountries',
    'manageSkus',
    'managePrices',
    'manageAttributes',
    'manageCoupons',
    'manageReviews',
    'manageWishlists',
    'manageCarts',
    'manageOrderStatuses',
    'managePaymentMethods',
    'manageShippingMethods',
    'manageCurrencies',
    'manageTaxes',
    'manageBanners',

    'manageCarts',

  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
