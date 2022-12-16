'use strict';

const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

/**
 *
 * /api/v1/users
 *
 */

const userRouter = express.Router();

userRouter
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(authController.protect, userController.createUser);

userRouter.get('/me', authController.protect, userController.getMe);

module.exports = userRouter;
