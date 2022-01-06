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
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
