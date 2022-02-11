const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bannerValidation = require('../../validations/banner.validation');
const bannerController = require('../../controllers/banner.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(bannerValidation.getBanners), bannerController.getBanners)
  .post(auth('manageBanners'), validate(bannerValidation.createBanner), bannerController.createBanner);

router.route('/title/:bannerTitle').get(validate(bannerValidation.getBannerByTitle), bannerController.getBannerByTitle);

router
  .route('/:bannerId')
  .get(validate(bannerValidation.getBanner), bannerController.getBanner)
  .patch(auth('manageBanners'), validate(bannerValidation.updateBanner), bannerController.updateBanner)
  .delete(auth('manageBanners'), validate(bannerValidation.deleteBanner), bannerController.deleteBanner);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner management and retrieval
 */

/**
 * @swagger
 * /banners:
 *   post:
 *     summary: Create a banner
 *     description: Only admins can create banners.
 *     tags: [Banners]
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
 *               - url
 *               - field
 *               - target
 *               - row
 *               - isActive
 *             properties:
 *               title:
 *                 type: string
 *                 description: must be unique
 *               image:
 *                 type: string
 *                 format: url
 *               url:
 *                 type: string
 *                 format: url
 *                 description: must be unique
 *               field:
 *                 type: string
 *               target:
 *                 type: string
 *               row:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *             example:
 *               title: banner
 *               image: https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *               url: https://www.google.com
 *               field: home
 *               target: _blank
 *               row: 1
 *               isActive: true
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Banner'
 *       "400":
 *         $ref: '#/components/responses/DuplicateBanner'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all banners
 *     description: Only admins can retrieve all banners.
 *     tags: [Banners]

 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Banner title
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Banner isActive
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
 *         description: Maximum number of banners
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
 *                     $ref: '#/components/schemas/Banner'
 *                 page:
 *                   type: integer
 *                   example: 1
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
 * /banners/title/{title}:
 *   get:
 *     summary: Get a banner by title
 *     description: Logged in banners can fetch only their own banner information.
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner title
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Banner'
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
 * /banners/{id}:
 *   get:
 *     summary: Get a banner
 *     description: Get a banner by id
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Banner'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a banner
 *     description: Only admins can update banners.
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner id
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
 *               url:
 *                 type: string
 *                 format: url
 *                 description: must be unique
 *               field:
 *                 type: string
 *               target:
 *                 type: string
 *               row:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *             example:
 *               title: banner
 *               image: https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png
 *               url: https://www.google.com
 *               field: home
 *               target: _blank
 *               row: 1
 *               isActive: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Banner'
 *       "400":
 *         $ref: '#/components/responses/DuplicateBanner'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a banner
 *     description: Only admins can delete banners.
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banner id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
