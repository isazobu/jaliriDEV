const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Product } = require('../models');
const { populate } = require('../models/token.model');

/**
 * Query for Brands
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @returns {Promise<QueryResult>}
 */

// product search in seotitle field
const autoCompleteSearch = async (key) => {
  const query = Product.aggregate([
    {
      $search: {
        index: 'autocomplete',
        autocomplete: {
          query: key,
          path: 'title',
          fuzzy: {
            maxEdits: 2,
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
      },
    },
    {
      $limit: 10,
    },
    {
      $sort: { score: { $meta: 'textScore' } },
    },
  ]);

  return query;
};

module.exports = {
  autoCompleteSearch,
};
