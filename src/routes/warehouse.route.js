const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const warehouseValidation = require('../../validations/warehouse.validation');
const warehouseController = require('../../controllers/warehouse.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(warehouseValidation.getWarehouses), warehouseController.getWarehouses)
  .post(auth('manageWarehouses'), validate(warehouseValidation.createWarehouse), warehouseController.createWarehouse);

router
  .route('/title/:warehouseTitle')
  .get(validate(warehouseValidation.getWarehouseByTitle), warehouseController.getWarehouseByTitle);

router
  .route('/:warehouseId')
  .get(validate(warehouseValidation.getWarehouse), warehouseController.getWarehouse)
  .patch(auth('manageWarehouses'), validate(warehouseValidation.updateWarehouse), warehouseController.updateWarehouse)
  .delete(auth('manageWarehouses'), validate(warehouseValidation.deleteWarehouse), warehouseController.deleteWarehouse);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: Warehouse management and retrieval
 */

/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: Create a warehouse
 *     description: Only admins can create other warehouses.
 *     tags: [Warehouses]
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
 *                $ref: '#/components/schemas/Warehouse'
 *       "400":
 *         $ref: '#/components/responses/DuplicateWarehouse'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all warehouses
 *     description: Only admins can retrieve all warehouses.
 *     tags: [Warehouses]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Warehouse title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Warehouse isActive
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
 *         description: Maximum number of warehouses
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
 *                     $ref: '#/components/schemas/Warehouse'
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
 * /warehouses/title/{title}:
 *   get:
 *     summary: Get a warehouse by title
 *     description: Logged in warehouses can fetch only their own warehouse information.
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Warehouse title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Warehouse'
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
 * /warehouses/{id}:
 *   get:
 *     summary: Get a warehouse
 *     description: Logged in warehouses can fetch only their own warehouse information. Only admins can fetch other warehouses.
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Warehouse id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Warehouse'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a warehouse
 *     description: Logged in warehouses can only update their own information. Only admins can update other warehouses.
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Warehouse id
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
 *                $ref: '#/components/schemas/Warehouse'
 *       "400":
 *         $ref: '#/components/responses/DuplicateWarehouse'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a warehouse
 *     description: Logged in warehouses can delete only themselves. Only admins can delete other warehouses.
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Warehouse id
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
