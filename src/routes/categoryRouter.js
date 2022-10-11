'use strict';

const express = require('express');

const categoryController = require('../controllers/categoryController');

/**
 *
 * /api/v1/records
 *
 */

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

module.exports = categoryRouter;