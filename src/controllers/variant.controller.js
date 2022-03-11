const httpStatus = require('http-status');
    const pick = require('../utils/pick');
    const ApiError = require('../utils/ApiError');
    const catchAsync = require('../utils/catchAsync');
    const { variantService } = require('../services');
    
    const createVariant = catchAsync(async (req, res) => {
      const variant = await variantService.createVariant(req.body);
      res.status(httpStatus.CREATED).send(variant);
    });
    
    const getVariants = catchAsync(async (req, res) => {
      const filter = pick(req.query, ['title', 'isActive']);
      const options = pick(req.query, ['sortBy', 'limit']);
      const result = await variantService.queryVariants(filter, options);
      res.status(httpStatus.OK).send(result);
    });
    
    const getVariant = catchAsync(async (req, res) => {
      const variant = await variantService.getVariantById(req.params.variantId);
      if (!variant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
      }
      res.status(httpStatus.OK).send(variant);
    });
    
    const getVariantByTitle = catchAsync(async (req, res) => {
      const variant = await variantService.getVariantByTitle(req.params.variantTitle);
      if (!variant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
      }
      res.status(httpStatus.OK).send(variant);
    });
    
    const updateVariant = catchAsync(async (req, res) => {
      const variant = await variantService.updateVariantById(req.params.variantId, req.body);
      res.send(variant);
    });
    
    const deleteVariant = catchAsync(async (req, res) => {
      await variantService.deleteVariantById(req.params.variantId);
      res.status(httpStatus.NO_CONTENT).send();
    });
    
    module.exports = {
      createVariant,
      getVariants,
      getVariant,
      getVariantByTitle,
      updateVariant,
      deleteVariant,
    };
    
    