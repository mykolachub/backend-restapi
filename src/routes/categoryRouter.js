'use strict';

const express = require('express');

const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

/**
 *
 * /api/v1/categories
 *
 */

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(authController.protect, categoryController.getAllCategories)
  .post(authController.protect, categoryController.createCategory);

module.exports = categoryRouter;
