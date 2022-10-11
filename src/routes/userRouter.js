'use strict';

const express = require('express');

const userController = require('../controllers/userController');

/**
 *
 * /api/v1/users
 *
 */

const userRouter = express.Router();

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

module.exports = userRouter;
