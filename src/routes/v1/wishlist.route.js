const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const { wishlistController } = require('../../controllers');
const { wishlistValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(wishlistValidation.getWishlists), wishlistController.getWishlists)
  .post(auth(), wishlistController.createWishlist);

router
  .route('/me')
  .get(auth(), validate(wishlistValidation.getMyWishlist), wishlistController.getMyWishlist)
  .post(auth(), validate(wishlistValidation.addToWishlist), wishlistController.addToWishlist)
  .delete(auth(), validate(wishlistValidation.removeFromWishlist), wishlistController.removeFromWishlist);

router
  .route('/:wishlistId')
  .get(auth(), wishlistController.getWishlist)
  .patch(auth(), wishlistController.updateWishlist)
  .delete(auth(), wishlistController.deleteWishlist);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Wishlists
 *   description: Wishlist management and retrieval
 */

/**
 * @swagger
 * /wishlists:
 *   post:
 *     summary: Create a wishlist
 *     description: Only admins can create other wishlists.
 *     tags: [Wishlists]
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
 *                $ref: '#/components/schemas/Wishlist'
 *       "400":
 *         $ref: '#/components/responses/DuplicateWishlist'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all wishlists
 *     description: Only admins can retrieve all wishlists.
 *     tags: [Wishlists]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Wishlist title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Wishlist isActive
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
 *         description: Maximum number of wishlists
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
 *                     $ref: '#/components/schemas/Wishlist'
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
 * /wishlists/title/{title}:
 *   get:
 *     summary: Get a wishlist by title
 *     description: Logged in wishlists can fetch only their own wishlist information.
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Wishlist'
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
 * /wishlists/{id}:
 *   get:
 *     summary: Get a wishlist
 *     description: Logged in wishlists can fetch only their own wishlist information. Only admins can fetch other wishlists.
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Wishlist'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a wishlist
 *     description: Logged in wishlists can only update their own information. Only admins can update other wishlists.
 *     tags: [Wishlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist id
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
 *                $ref: '#/components/schemas/Wishlist'
 *       "400":
 *         $ref: '#/components/responses/DuplicateWishlist'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a wishlist
 *     description: Logged in wishlists can delete only themselves. Only admins can delete other wishlists.
 *     tags: [Wishlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist id
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
