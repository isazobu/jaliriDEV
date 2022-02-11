const express = require('express');
const auth = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');
const validate = require('../../middlewares/validate');
const { cartValidation } = require('../../validations');
const { checkStock } = require('../../middlewares/stock');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(auth('manageCarts'), validate(cartValidation.getCart), cartController.getCart)
  .post(auth('manageCarts'), cartController.addToCart);

router.post(
  '/manipulate',
  auth('manageCarts'),
  validate(cartValidation.manipulate),
  checkStock(),
  cartController.manipulate
);
router.get('/stock', auth(), cartController.getCartStock);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Banner management and retrieval
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get cart
 *     description: Get the cart of logged user.
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: detail
 *         schema:
 *           type: boolean
 *           default: false
 *         description: If true, return cart detail
 *     responses:
 *       "200":
 *         description: Cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *
 *   post:
 *     summary: Add products to cart
 *     description: Only users can add to cart. It can be used for multiple add operations.
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 quantity:
 *                   type: number
 *               example:
 *                   productId: 5e9f8f8f8f8f8f8f8f8f8f8
 *                   quantity: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Cart'
 *       "400":
 *         $ref: '#/components/responses/DuplicateBanner'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /carts/manipulate:
 *   post:
 *     summary: Manipulate cart with given action
 *     description: delete by negative one quntity is to remove product from cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum:
 *                   - insert
 *                   - delete
 *                   - truncate
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *             example:
 *               action: insert
 *               productId: 5e9f8f8f8f8f8f8f8f8f8f8
 *               quantity: 1
 *     responses:
 *       "200":
 *         description: Changes saved successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
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
 * /carts/stock:
 *   get:
 *     summary: Get cart stock
 *     description: Get the stock of all products in cart of logged user.
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Cart stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: string
 *                 hasStock:
 *                   type: boolean
 *                 totalStock:
 *                   type: number
 *               example:
 *                 product: 5e9f8f8f8f8f8f8f8f8f8f8
 *                 hasStock: true
 *                 totalStock: 10
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */
