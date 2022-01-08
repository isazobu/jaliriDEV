const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const skuValidation = require('../../validations/sku.validation');
const skuController = require('../../controllers/sku.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(skuValidation.getSkus), skuController.getSkus)
  .post(auth('manageSkus'), validate(skuValidation.createSku), skuController.createSku);

//! ADD swagger this route
// router.route('/title/:sku').get(validate(skuValidation.getSkuByTitle), skuController.getSkuByTitle);

router
  .route('/:skuId')
  .get(validate(skuValidation.getSku), skuController.getSku)
  .patch(auth('manageSkus'), validate(skuValidation.updateSku), skuController.updateSku)
  .delete(auth('manageSkus'), validate(skuValidation.deleteSku), skuController.deleteSku);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Skus
 *   description: Sku management and retrieval
 */

/**
 * @swagger
 * /skus:
 *   post:
 *     summary: Create a sku
 *     description: Only admins can create other skus.
 *     tags: [Skus]
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
 *                $ref: '#/components/schemas/Sku'
 *       "400":
 *         $ref: '#/components/responses/DuplicateSku'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all skus
 *     description: Only admins can retrieve all skus.
 *     tags: [Skus]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Sku title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Sku isActive
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
 *         description: Maximum number of skus
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
 *                     $ref: '#/components/schemas/Sku'
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
 * /skus/title/{title}:
 *   get:
 *     summary: Get a sku by title
 *     description: Logged in skus can fetch only their own sku information.
 *     tags: [Skus]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Sku title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sku'
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
 * /skus/{id}:
 *   get:
 *     summary: Get a sku
 *     description: Logged in skus can fetch only their own sku information. Only admins can fetch other skus.
 *     tags: [Skus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sku id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Sku'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a sku
 *     description: Logged in skus can only update their own information. Only admins can update other skus.
 *     tags: [Skus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sku id
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
 *                $ref: '#/components/schemas/Sku'
 *       "400":
 *         $ref: '#/components/responses/DuplicateSku'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a sku
 *     description: Logged in skus can delete only themselves. Only admins can delete other skus.
 *     tags: [Skus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sku id
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
