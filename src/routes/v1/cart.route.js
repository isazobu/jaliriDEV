const express = require('express');
const auth = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');
const validate = require('../../middlewares/validate');
const { cartValidation } = require('../../validations');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(auth('manageCarts'), validate(cartValidation.getCart), cartController.getCart)
  .post(auth('manageCarts'), validate(cartValidation.addToCart), cartController.addToCart)
  .patch(auth('manageCarts'), cartController.updateCart);

router
  .post('/add', auth('manageCarts'), validate(cartValidation.increaseQuantity), cartController.increaseQuantity)
  .post('/remove', auth('manageCarts'), validate(cartValidation.decreaseQuantity), cartController.decreaseQuantity)
  .delete('/:productId', auth('manageCarts'), validate(cartValidation.deleteFromCart), cartController.deleteFromCart);

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
 *     summary: Add to cart
 *     description: Only users can add to cart.
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *             example:
 *               productId: 61f10af8035339138bfb9874
 *               quantity: 2
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
 * /carts/{id}:
 *   delete:
 *     summary: Delete an item from cart
 *     description: Only users can delete item from their cart.
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         example: 61f10af8035339138bfb9874
 *     responses:
 *       "204":
 *         description: No content
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
 * /carts/add:
 *   post:
 *    summary: Increase quantity of an item by one in cart
 *    description: Only users can increase quantity of an item in their cart.
 *    tags: [Carts]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          required:
 *            - productId
 *          properties:
 *            productId:
 *              type: string
 *          example:
 *            productId: 61f10af8035339138bfb9874
 *    responses:
 *      "200":
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cart'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /carts/remove:
 *   post:
 *    summary: Decrease quantity of an item by one in cart
 *    description: Only users can decrease quantity of an item in their cart.
 *    tags: [Carts]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          required:
 *            - productId
 *          properties:
 *            productId:
 *              type: string
 *          example:
 *            productId: 61f10af8035339138bfb9874
 *    responses:
 *      "200":
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cart'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 */
