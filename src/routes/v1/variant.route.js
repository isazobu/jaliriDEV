const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const variantController = require('../../controllers/variant.controller');
const { variantValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .get(validate(variantValidation.getVariants), variantController.getVariants)
  .post(auth('manageVariants'), validate(variantValidation.createVariant), variantController.createVariant);

router.route('/sku/:variantSku').get(validate(variantValidation.getVariantBySku), variantController.getVariantBySku);

router
  .route('/:variantId')
  .get(validate(variantValidation.getVariantById), variantController.getVariant)
  .patch(auth('manageVariants'), validate(variantValidation.updateVariant), variantController.updateVariant)
  .delete(auth('manageVariants'), validate(variantValidation.deleteVariant), variantController.deleteVariant);

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
 *             $ref: '#/components/schemas/Variant'
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
 *         name: product
 *         schema:
 *           type: string
 *         description: Product of variant
 *       - in: query
 *         name: sku
 *         schema:
 *           type: string
 *         description: SKU of variant
 *       - in: query
 *         name: barcode
 *         schema:
 *           type: string
 *         description: Barcode of variant
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Page number

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
 * /variants/sku/{sku}:
 *   get:
 *     summary: Get a variant by sku
 *     description: Retrieve a variant by sku.
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant sku
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
 *             $ref: '#/components/schemas/Variant'
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
