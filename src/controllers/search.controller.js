/* eslint-disable no-use-before-define */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { searchService } = require('../services');

const autoCompleteSearch = catchAsync(async (req, res) => {
  const result = await searchService.autoCompleteSearch(req.query.key);
  // if search products not found
  if (result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: 'No products found',
    });
  }

  res.status(httpStatus.OK).send(result);
});

module.exports = {
  autoCompleteSearch,
};
