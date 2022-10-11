'use strict';

const express = require('express');

const recordController = require('../controllers/recordController');

/**
 *
 * /api/v1/records
 *
 */

const recordRouter = express.Router();

recordRouter
  .route('/')
  .get(recordController.getAllRecords)
  .post(recordController.createRecord);

module.exports = recordRouter;
