const allRoles = {
  guest: [],
  user: [],
  admin: ['getUsers', 'manageOrders', 'manageAddresses', 'manageUsers', 'getCategory', 'manageCategories', 'manageProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
