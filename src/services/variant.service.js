const { Variant } = require('../models');


    const httpStatus = require('http-status');
    const ApiError = require('../utils/ApiError');
    
    /**
     * Create a variant
     * @param {Object} variantBody
     * @returns {Promise<Variant>}
     */
    const createVariant = async (variantBody) => {
      if (await Variant.isVariantExist(variantBody.title)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Variant already exist');
      }
      return Variant.create(variantBody);
    };
    
    /**
     * Query for Variants
     * @param {Object} filter - Mongo filter
     * @param {Object} options - Query options
     * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
     * @param {number} [options.limit] - Maximum number of results per page (default = 10)
     * @returns {Promise<QueryResult>}
     */
    const queryVariants = async (filter, options) => {
      const variants = await Variant.paginate(filter, options);
      return variants;
    };
    
    /**
     * Get variant by id
     * @param {ObjectId} id
     * @returns {Promise<Variant>}
     */
    const getVariantById = async (variantId) => {
      return Variant.findById(variantId);
    };
    
    /**
     * Get variant by name
     * @param {string} title
     * @returns {Promise<Variant>}
     */
    const getVariantByTitle = async (title) => {
      return Variant.findOne({ title });
    };
    
    /**
     * Update variant by id
     * @param {ObjectId} variantId
     * @param {Object} updateBody
     * @returns {Promise<Variant>}
     */
    
    const updateVariantById = async (variantId, updateBody) => {
      const variant = await getVariantById(variantId);
      if (!variant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
      }
      if (updateBody.title && (await Variant.isVariantExist(updateBody.title, variantId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Variant already taken');
      }
      Object.assign(variant, updateBody);
      await variant.save();
      return variant;
    };
    
    /**
     * Delete variant by id
     * @param {ObjectId} variantId
     * @returns {Promise<Variant>}
     */
    const deleteVariantById = async (variantId) => {
      const variant = await getVariantById(variantId);
      if (!variant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found');
      }
      await variant.remove();
      return variant;
    };
    
    module.exports = {
      createVariant,
      queryVariants,
      getVariantById,
      getVariantByTitle,
      updateVariantById,
      deleteVariantById,
    };
    