// COLOR ROUTE EXPRESS JS
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const colorValidation = require('../../validations/color.validation');
const colorController = require('../../controllers/color.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(colorValidation.getColors), colorController.getColors)
  .post(auth('manageColors'), validate(colorValidation.createColor), colorController.createColor);

//! ADD swagger this route
router.route('/title/:colorName').get(validate(colorValidation.getColorByTitle), colorController.getColorByTitle);

router
  .route('/:colorId')
  .get(validate(colorValidation.getColor), colorController.getColor)
  .patch(auth('manageColors'), validate(colorValidation.updateColor), colorController.updateColor)
  .delete(auth('manageColors'), validate(colorValidation.deleteColor), colorController.deleteColor);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Colors
 *   description: Color management and retrieval
 */

/**
 * @swagger
 * /colors:
 *   post:
 *     summary: Create a color
 *     description: Only admins can create other colors.
 *     tags: [Colors]
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
 *                $ref: '#/components/schemas/Color'
 *       "400":
 *         $ref: '#/components/responses/DuplicateColor'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all colors
 *     description: Only admins can retrieve all colors.
 *     tags: [Colors]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Color title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Color isActive
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
 *         description: Maximum number of colors
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
 *                     $ref: '#/components/schemas/Color'
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
 * /colors/title/{title}:
 *   get:
 *     summary: Get a color by title
 *     description: Logged in colors can fetch only their own color information.
 *     tags: [Colors]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Color title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Color'
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
 * /colors/{id}:
 *   get:
 *     summary: Get a color
 *     description: Logged in colors can fetch only their own color information. Only admins can fetch other colors.
 *     tags: [Colors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Color id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Color'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a color
 *     description: Logged in colors can only update their own information. Only admins can update other colors.
 *     tags: [Colors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Color id
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
 *                $ref: '#/components/schemas/Color'
 *       "400":
 *         $ref: '#/components/responses/DuplicateColor'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a color
 *     description: Logged in colors can delete only themselves. Only admins can delete other colors.
 *     tags: [Colors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Color id
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
