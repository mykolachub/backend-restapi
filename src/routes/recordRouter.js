'use strict';

const express = require('express');

const recordController = require('../controllers/recordController');
const authController = require('../controllers/authController');

/**
 *
 * /api/v1/records
 *
 */

const recordRouter = express.Router();

recordRouter
  .route('/')
  .get(authController.protect, recordController.getAllRecords)
  .post(authController.protect, recordController.createRecord);

module.exports = recordRouter;
