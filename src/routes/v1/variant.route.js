const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const variantController = require('../../controllers/variant.controller');

const router = express.Router();

router.route('/').get(variantController.getVariants).post(auth(), variantController.createVariant);

router.route('/title/:variantTitle').get(variantController.getVariantByTitle);

router
  .route('/:variantId')
  .get(variantController.getVariant)
  .patch(auth('manageVariants'), variantController.updateVariant)
  .delete(auth('manageVariants'), variantController.deleteVariant);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Variants
 *   description: Variant management and retrieval
 */

/**
 * @swagger
 * /variants:
 *   post:
 *     summary: Create a variant
 *     description: Only admins can create other variants.
 *     tags: [Variants]
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
 *                $ref: '#/components/schemas/Variant'
 *       "400":
 *         $ref: '#/components/responses/DuplicateVariant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all variants
 *     description: Only admins can retrieve all variants.
 *     tags: [Variants]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Variant title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Variant isActive
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
 *         description: Maximum number of variants
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
 *                     $ref: '#/components/schemas/Variant'
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
 * /variants/title/{title}:
 *   get:
 *     summary: Get a variant by title
 *     description: Logged in variants can fetch only their own variant information.
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Variant'
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
 * /variants/{id}:
 *   get:
 *     summary: Get a variant
 *     description: Logged in variants can fetch only their own variant information. Only admins can fetch other variants.
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Variant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a variant
 *     description: Logged in variants can only update their own information. Only admins can update other variants.
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant id
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
 *                $ref: '#/components/schemas/Variant'
 *       "400":
 *         $ref: '#/components/responses/DuplicateVariant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a variant
 *     description: Logged in variants can delete only themselves. Only admins can delete other variants.
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant id
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
