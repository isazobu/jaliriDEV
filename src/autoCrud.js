// fs nodejs lib
const fs = require('fs');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function writeFilePromise(fileName) {
  new Promise((resolve, reject) => {
    console.log(fileName);
    const upperFileName = capitalizeFirstLetter(fileName);

    const routesString = `
    const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ${fileName}Validation = require('../../validations/${fileName}.validation');
const ${fileName}Controller = require('../../controllers/${fileName}.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(${fileName}Validation.get${upperFileName}s), ${fileName}Controller.get${upperFileName}s)
  .post(auth('manage${upperFileName}s'), validate(${fileName}Validation.create${upperFileName}), ${fileName}Controller.create${upperFileName});


router
  .route('/title/:${fileName}Title')
  .get(validate(${fileName}Validation.get${upperFileName}ByTitle), ${fileName}Controller.get${upperFileName}ByTitle);

router
  .route('/:${fileName}Id')
  .get(validate(${fileName}Validation.get${upperFileName}), ${fileName}Controller.get${upperFileName})
  .patch(auth('manage${upperFileName}s'), validate(${fileName}Validation.update${upperFileName}), ${fileName}Controller.update${upperFileName})
  .delete(auth('manage${upperFileName}s'), validate(${fileName}Validation.delete${upperFileName}), ${fileName}Controller.delete${upperFileName});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ${upperFileName}s
 *   description: ${upperFileName} management and retrieval
 */

/**
 * @swagger
 * /${fileName}s:
 *   post:
 *     summary: Create a ${fileName}
 *     description: Only admins can create other ${fileName}s.
 *     tags: [${upperFileName}s]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - image
 *               - isActive
 *             properties:
 *               title:
 *                 type: string
 *                 description: must be unique
 *               image:
 *                 type: string
 *                 format: url
 *               isActive:
 *                 type: boolean
 *             example:
 *               title: Shoes
 *               image: fake@example.com
 *               isActive: true
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/${upperFileName}'
 *       "400":
 *         $ref: '#/components/responses/Duplicate${upperFileName}'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all ${fileName}s
 *     description: Only admins can retrieve all ${fileName}s.
 *     tags: [${upperFileName}s]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: ${upperFileName} title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: ${upperFileName} isActive
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of ${fileName}s
 *      
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/${upperFileName}'
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /${fileName}s/title/{title}:
 *   get:
 *     summary: Get a ${fileName} by title
 *     description: Logged in ${fileName}s can fetch only their own ${fileName} information.
 *     tags: [${upperFileName}s]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: ${upperFileName} title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/${upperFileName}'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
/**
 * @swagger
 * /${fileName}s/{id}:
 *   get:
 *     summary: Get a ${fileName}
 *     description: Logged in ${fileName}s can fetch only their own ${fileName} information. Only admins can fetch other ${fileName}s.
 *     tags: [${upperFileName}s]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ${upperFileName} id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/${upperFileName}'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a ${fileName}
 *     description: Logged in ${fileName}s can only update their own information. Only admins can update other ${fileName}s.
 *     tags: [${upperFileName}s]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ${upperFileName} id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: must be unique
 *               image:
 *                 type: string
 *                 format: url
 *               isActive:
 *                 type: boolean
 *             example:
 *               title: fake name
 *               url: example.com
 *               isActive: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/${upperFileName}'
 *       "400":
 *         $ref: '#/components/responses/Duplicate${upperFileName}'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a ${fileName}
 *     description: Logged in ${fileName}s can delete only themselves. Only admins can delete other ${fileName}s.
 *     tags: [${upperFileName}s]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ${upperFileName} id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

        `;
    const modelsString = `const mongoose = require('mongoose');

    const { Schema } = mongoose;
    var slugify = require('slugify');
    // const validator = require('validator');
    const { toJSON, paginate } = require('./plugins');
    
    const ${fileName}Schema = Schema(
      {
        title: {
          type: String,
          trim: true,
          unique: true,
          required: [true, '${upperFileName} title is required'],
        },
        image: { type: String },
        isActive: { type: Boolean, required: true, default: false },
        // ${fileName} slug model
        slug: {
          type: String,
          trim: true,
          required: [true, '${upperFileName} slug is required'],
        },
      },
      { timestamps: true }
    );
    
    ${fileName}Schema.plugin(toJSON);
    ${fileName}Schema.plugin(paginate);
    
    /**
     * Check if ${fileName} is already exist
     * @param {string} title - The ${fileName}'s title
     * @param {ObjectId} [exclude${upperFileName}Id] - The id of the user to be excluded
     * @returns {Promise<boolean>}
     */
    ${fileName}Schema.statics.is${upperFileName}Exist = async function (title, excludeUserId) {
      const ${fileName} = await this.findOne({ title, _id: { $ne: excludeUserId } });
      return !!${fileName};
    };
    
    // pre Save Hook
    ${fileName}Schema.pre('save', function (next) {
      this.slug = slugify(this.title, { lower: true });
      next();
    });
    
    /**
     * @typedef ${upperFileName}
     */
    const ${upperFileName} = mongoose.model('${upperFileName}', ${fileName}Schema);
    
    module.exports = ${upperFileName};
    `;
    const servicesString = (myString = `const { ${upperFileName} } = require('../models');


    const httpStatus = require('http-status');
    const ApiError = require('../utils/ApiError');
    
    /**
     * Create a ${fileName}
     * @param {Object} ${fileName}Body
     * @returns {Promise<${upperFileName}>}
     */
    const create${upperFileName} = async (${fileName}Body) => {
      if (await ${upperFileName}.is${upperFileName}Exist(${fileName}Body.title)) {
        throw new ApiError(httpStatus.BAD_REQUEST, '${upperFileName} already exist');
      }
      return ${upperFileName}.create(${fileName}Body);
    };
    
    /**
     * Query for ${upperFileName}s
     * @param {Object} filter - Mongo filter
     * @param {Object} options - Query options
     * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
     * @param {number} [options.limit] - Maximum number of results per page (default = 10)
     * @returns {Promise<QueryResult>}
     */
    const query${upperFileName}s = async (filter, options) => {
      const ${fileName}s = await ${upperFileName}.paginate(filter, options);
      return ${fileName}s;
    };
    
    /**
     * Get ${fileName} by id
     * @param {ObjectId} id
     * @returns {Promise<${upperFileName}>}
     */
    const get${upperFileName}ById = async (${fileName}Id) => {
      return ${upperFileName}.findById(${fileName}Id);
    };
    
    /**
     * Get ${fileName} by name
     * @param {string} title
     * @returns {Promise<${upperFileName}>}
     */
    const get${upperFileName}ByTitle = async (title) => {
      return ${upperFileName}.findOne({ title });
    };
    
    /**
     * Update ${fileName} by id
     * @param {ObjectId} ${fileName}Id
     * @param {Object} updateBody
     * @returns {Promise<${upperFileName}>}
     */
    
    const update${upperFileName}ById = async (${fileName}Id, updateBody) => {
      const ${fileName} = await get${upperFileName}ById(${fileName}Id);
      if (!${fileName}) {
        throw new ApiError(httpStatus.NOT_FOUND, '${upperFileName} not found');
      }
      if (updateBody.title && (await ${upperFileName}.is${upperFileName}Exist(updateBody.title, ${fileName}Id))) {
        throw new ApiError(httpStatus.BAD_REQUEST, '${upperFileName} already taken');
      }
      Object.assign(${fileName}, updateBody);
      await ${fileName}.save();
      return ${fileName};
    };
    
    /**
     * Delete ${fileName} by id
     * @param {ObjectId} ${fileName}Id
     * @returns {Promise<${upperFileName}>}
     */
    const delete${upperFileName}ById = async (${fileName}Id) => {
      const ${fileName} = await get${upperFileName}ById(${fileName}Id);
      if (!${fileName}) {
        throw new ApiError(httpStatus.NOT_FOUND, '${upperFileName} not found');
      }
      await ${fileName}.remove();
      return ${fileName};
    };
    
    module.exports = {
      create${upperFileName},
      query${upperFileName}s,
      get${upperFileName}ById,
      get${upperFileName}ByTitle,
      update${upperFileName}ById,
      delete${upperFileName}ById,
    };
    `);
    const controllerString = `const httpStatus = require('http-status');
    const pick = require('../utils/pick');
    const ApiError = require('../utils/ApiError');
    const catchAsync = require('../utils/catchAsync');
    const { ${fileName}Service } = require('../services');
    
    const create${upperFileName} = catchAsync(async (req, res) => {
      const ${fileName} = await ${fileName}Service.create${upperFileName}(req.body);
      res.status(httpStatus.CREATED).send(${fileName});
    });
    
    const get${upperFileName}s = catchAsync(async (req, res) => {
      const filter = pick(req.query, ['title', 'isActive']);
      const options = pick(req.query, ['sortBy', 'limit']);
      const result = await ${fileName}Service.query${upperFileName}s(filter, options);
      res.status(httpStatus.OK).send(result);
    });
    
    const get${upperFileName} = catchAsync(async (req, res) => {
      const ${fileName} = await ${fileName}Service.get${upperFileName}ById(req.params.${fileName}Id);
      if (!${fileName}) {
        throw new ApiError(httpStatus.NOT_FOUND, '${upperFileName} not found');
      }
      res.status(httpStatus.OK).send(${fileName});
    });
    
    const get${upperFileName}ByTitle = catchAsync(async (req, res) => {
      const ${fileName} = await ${fileName}Service.get${upperFileName}ByTitle(req.params.${fileName}Title);
      if (!${fileName}) {
        throw new ApiError(httpStatus.NOT_FOUND, '${upperFileName} not found');
      }
      res.status(httpStatus.OK).send(${fileName});
    });
    
    const update${upperFileName} = catchAsync(async (req, res) => {
      const ${fileName} = await ${fileName}Service.update${upperFileName}ById(req.params.${fileName}Id, req.body);
      res.send(${fileName});
    });
    
    const delete${upperFileName} = catchAsync(async (req, res) => {
      await ${fileName}Service.delete${upperFileName}ById(req.params.${fileName}Id);
      res.status(httpStatus.NO_CONTENT).send();
    });
    
    module.exports = {
      create${upperFileName},
      get${upperFileName}s,
      get${upperFileName},
      get${upperFileName}ByTitle,
      update${upperFileName},
      delete${upperFileName},
    };
    
    `;
    const validationsString = `
    const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create${upperFileName} = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    image: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const get${upperFileName}s = {
  query: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string(),
    isActive: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    // page: Joi.number().integer(),
  }),
};

const get${upperFileName} = {
  params: Joi.object().keys({
    ${fileName}Id: Joi.string().custom(objectId),
  }),
};
const get${upperFileName}ByTitle = {
  params: Joi.object().keys({
    ${fileName}Title: Joi.string().required(),
  }),
};

const update${upperFileName} = {
  params: Joi.object().keys({
    ${fileName}Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      image: Joi.string(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const delete${upperFileName} = {
  params: Joi.object().keys({
    ${fileName}Id: Joi.string().custom(objectId),
  }),
};
module.exports = {
  create${upperFileName},
  get${upperFileName}s,
  get${upperFileName},
  update${upperFileName},
  delete${upperFileName},
  get${upperFileName}ByTitle,
};
`;
    fs.writeFile(`routes/${fileName}.route.js`, routesString, (err) => {
      err ? reject(err) : resolve();
    });

    fs.writeFile(`models/${fileName}.model.js`, modelsString, (err) => {
      err ? reject(err) : resolve();
    });

    fs.writeFile(`services/${fileName}.service.js`, servicesString, (err) => {
      err ? reject(err) : resolve();
    });

    fs.writeFile(`controllers/${fileName}.validation.js`, controllerString, (err) => {
      err ? reject(err) : resolve();
    });
    fs.writeFile(`validations/${fileName}.js`, validationsString, (err) => {
      err ? reject(err) : resolve();
    });
  });
}

writeFilePromise(process.argv[2]);
