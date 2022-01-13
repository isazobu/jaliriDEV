const allRoles = {
  guest: [],
  user: [],
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
    'manageProductAttrs',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
