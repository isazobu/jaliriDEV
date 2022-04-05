const allRoles = {
  guest: [],
  user: ['me', 'manageCarts', 'manageOrders'],
  admin: [
    'me',
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
    'manageBrands',
    'manageVariants',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
