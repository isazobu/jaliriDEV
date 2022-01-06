// COLOR ROUTE EXPRESS JS
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const sizeValidation = require('../../validations/size.validation');
const sizeController = require('../../controllers/size.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(sizeValidation.getSizes), sizeController.getSizes)
  .post(auth('manageSizes'), validate(sizeValidation.createSize), sizeController.createSize);

//! ADD swagger this route
router.route('/title/:size').get(validate(sizeValidation.getSizeByTitle), sizeController.getSizeByTitle);

router
  .route('/:sizeId')
  .get(validate(sizeValidation.getSize), sizeController.getSize)
  .patch(auth('manageSizes'), validate(sizeValidation.updateSize), sizeController.updateSize)
  .delete(auth('manageSizes'), validate(sizeValidation.deleteSize), sizeController.deleteSize);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Sizes
 *   description: Size management and retrieval
 */

/**
 * @swagger
 * /sizes:
 *   post:
 *     summary: Create a size
 *     description: Only admins can create other sizes.
 *     tags: [Sizes]
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
 *                $ref: '#/components/schemas/Size'
 *       "400":
 *         $ref: '#/components/responses/DuplicateSize'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all sizes
 *     description: Only admins can retrieve all sizes.
 *     tags: [Sizes]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Size title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Size isActive
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
 *         description: Maximum number of sizes
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
 *                     $ref: '#/components/schemas/Size'
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
 * /sizes/title/{title}:
 *   get:
 *     summary: Get a size by title
 *     description: Logged in sizes can fetch only their own size information.
 *     tags: [Sizes]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Size title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Size'
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
 * /sizes/{id}:
 *   get:
 *     summary: Get a size
 *     description: Logged in sizes can fetch only their own size information. Only admins can fetch other sizes.
 *     tags: [Sizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Size id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Size'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a size
 *     description: Logged in sizes can only update their own information. Only admins can update other sizes.
 *     tags: [Sizes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Size id
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
 *                $ref: '#/components/schemas/Size'
 *       "400":
 *         $ref: '#/components/responses/DuplicateSize'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a size
 *     description: Logged in sizes can delete only themselves. Only admins can delete other sizes.
 *     tags: [Sizes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Size id
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
