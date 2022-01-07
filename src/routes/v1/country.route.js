// COLOR ROUTE EXPRESS JS
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const countryValidation = require('../../validations/country.validation');
const countryController = require('../../controllers/country.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(countryValidation.getCountries), countryController.getCountries)
  .post(auth('manageCountries'), validate(countryValidation.createCountry), countryController.createCountry);

//! ADD swagger this route
router.route('/code/:code').get(validate(countryValidation.getCountryByCode), countryController.getCountryByCode);

router
  .route('/:countryId')
  .get(validate(countryValidation.getCountry), countryController.getCountry)
  .patch(auth('manageCountries'), validate(countryValidation.updateCountry), countryController.updateCountry)
  .delete(auth('manageCountries'), validate(countryValidation.deleteCountry), countryController.deleteCountry);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Country management and retrieval
 */

/**
 * @swagger
 * /countries:
 *   post:
 *     summary: Create a country
 *     description: Only admins can create other countries.
 *     tags: [Countries]
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
 *                $ref: '#/components/schemas/Country'
 *       "400":
 *         $ref: '#/components/responses/DuplicateCountry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all countries
 *     description: Only admins can retrieve all countries.
 *     tags: [Countries]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Country title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Country isActive
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
 *         description: Maximum number of countries
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
 *                     $ref: '#/components/schemas/Country'
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
 * /countries/title/{title}:
 *   get:
 *     summary: Get a country by title
 *     description: Logged in countries can fetch only their own country information.
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Country title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Country'
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
 * /countries/{id}:
 *   get:
 *     summary: Get a country
 *     description: Logged in countries can fetch only their own country information. Only admins can fetch other countries.
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Country'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a country
 *     description: Logged in countries can only update their own information. Only admins can update other countries.
 *     tags: [Countries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country id
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
 *                $ref: '#/components/schemas/Country'
 *       "400":
 *         $ref: '#/components/responses/DuplicateCountry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a country
 *     description: Logged in countries can delete only themselves. Only admins can delete other countries.
 *     tags: [Countries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country id
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
