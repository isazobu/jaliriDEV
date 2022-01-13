const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productAttrController = require('../../controllers/productAttr.controller');

const router = express.Router();

router
  .route('/')
  .get(productAttrController.getProductAttrs)
  .post(auth('manageProductAttrs'), productAttrController.createProductAttr);

router.route('/title/:productAttrTitle').get(productAttrController.getProductAttrByTitle);

router
  .route('/:productAttrId')
  .get(productAttrController.getProductAttr)
  .patch(auth('manageProductAttrs'), productAttrController.updateProductAttr)
  .delete(auth('manageProductAttrs'), productAttrController.deleteProductAttr);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ProductAttrs
 *   description: ProductAttr management and retrieval
 */

/**
 * @swagger
 * /productAttrs:
 *   post:
 *     summary: Create a productAttr
 *     description: Only admins can create other productAttrs.
 *     tags: [ProductAttrs]
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
 *                $ref: '#/components/schemas/ProductAttr'
 *       "400":
 *         $ref: '#/components/responses/DuplicateProductAttr'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all productAttrs
 *     description: Only admins can retrieve all productAttrs.
 *     tags: [ProductAttrs]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: ProductAttr title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: ProductAttr isActive
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
 *         description: Maximum number of productAttrs
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
 *                     $ref: '#/components/schemas/ProductAttr'
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
 * /productAttrs/title/{title}:
 *   get:
 *     summary: Get a productAttr by title
 *     description: Logged in productAttrs can fetch only their own productAttr information.
 *     tags: [ProductAttrs]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: ProductAttr title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ProductAttr'
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
 * /productAttrs/{id}:
 *   get:
 *     summary: Get a productAttr
 *     description: Logged in productAttrs can fetch only their own productAttr information. Only admins can fetch other productAttrs.
 *     tags: [ProductAttrs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ProductAttr id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ProductAttr'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a productAttr
 *     description: Logged in productAttrs can only update their own information. Only admins can update other productAttrs.
 *     tags: [ProductAttrs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ProductAttr id
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
 *                $ref: '#/components/schemas/ProductAttr'
 *       "400":
 *         $ref: '#/components/responses/DuplicateProductAttr'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a productAttr
 *     description: Logged in productAttrs can delete only themselves. Only admins can delete other productAttrs.
 *     tags: [ProductAttrs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ProductAttr id
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
