const productFiltering = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criterias using the format: sortField:(desc|asc). Multiple sorting criterias should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criterias should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.productFiltering = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const criterias = [];
    let filterObj = { $or: [] };

    // const countPromise = this.countDocuments(filter).exec();
    // multiple filters array split

    if (filter.category) {
      // let categoryCriteria = {};
      // CONCAT ALL CRITERİIAS

      filter.category.split(',').forEach((category, index) => {
        filterObj.$or.push({ 'category.slug': category });
      });
      criterias.push(filterObj);
      filterObj = { $or: [] };

      delete filter.category;
    }

    if (filter.brand) {
      filter.brand.split(',').forEach((brand) => {
        filterObj.$or.push({ brand });
      });
      criterias.push(filterObj);
      filterObj = { $or: [] };
      delete filter.brand;
    }

    if (filter.country) {
      filterObj.$or.push({ 'country.code': filter.country });
      criterias.push(filterObj);
      filterObj = { $or: [] };
      delete filter.country;
    }

    if (filter.discountExist === 'true') {
      var isTrueSet = filter.discountExist === 'true';
      filterObj.$or.push({ 'variants.price.discountExist': isTrueSet });
      criterias.push(filterObj);
      filterObj = { $or: [] };
      delete filter.discountExist;
    }

    if (filter.price) {
      let minAndMax;
      filter.price.split(',').forEach((price) => {
        minAndMax = price.split('-');

        filterObj.$or.push({
          'variants.price.sellingPrice.value': { $gte: parseInt(minAndMax[0]), $lte: parseInt(minAndMax[1]) },
        });
      });
      criterias.push(filterObj);
      filterObj = { $or: [] };
      delete filter.price;
    }
    if (filter.color) {
      filter.color.split(',').forEach((color) => {
        filterObj.$or.push({ 'variants.attributes.value': color });
      });
      criterias.push(filterObj);
      filterObj = { $or: [] };
      delete filter.color;
    }
    if (filter.size) {
      filter.size.split(',').forEach((size) => {
        filterObj.$or.push({ 'variants.attributes.value': size });
      });
      criterias.push(filterObj);
      filterObj = { $or: [] };
      delete filter.size;
    }

    if (filter.productId) {
      criterias.push({ productId: filter.productId });
    }

    let pipeline = [
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          pipeline: [
            {
              $project: { title: 1, slug: 1, id: 1 },
            },
          ],
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'countries',
          localField: 'country',
          foreignField: '_id',
          pipeline: [
            {
              $project: { name: 1, currencySymbol: 1, code: 1 },
            },
          ],
          as: 'country',
        },
      },
      {
        $match: {
          $and: criterias,
        },
      },
      { $limit: skip + limit },
      { $skip: skip },
    ];
    // search q query will be first stage in pipeline
    if (filter.q) {
      const query = {
        $search: {
          index: 'autocomplete',
          autocomplete: {
            query: filter.q,
            path: 'title',
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      };
      pipeline = [query].concat(pipeline);
    }

    const resultDoc = this.aggregate(pipeline)
      .sort(sort)

      .exec();

    // const countDoc = this.aggregate([
    //   {
    //     $lookup: {
    //       from: 'categories',
    //       localField: 'category',
    //       foreignField: '_id',

    //       as: 'category',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'countries',
    //       localField: 'country',
    //       foreignField: '_id',
    //       as: 'country',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'attributes',
    //       localField: 'variants.attributes',
    //       foreignField: '_id',
    //       as: 'variants.attributes',
    //     },
    //   },

    //   {
    //     $match: {
    //       $and: [
    //         {
    //           $or: categoryCriterias,
    //         },
    //       ],
    //     },
    //   },
    // ])
    //   .count('productId')
    //   .exec();

    return Promise.all([resultDoc]).then((values) => {
      const [results] = values;
      // const totalPages = Math.ceil(totalResults[0]?.productId / limit);
      const result = {
        results,
        page,
        limit,
        // totalResults: totalResults[0]?.productId,
        // totalPages,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = productFiltering;
