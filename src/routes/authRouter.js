'use strict';

const express = require('express');

const authController = require('../controllers/authController');

/**
 *
 * /api/v1/auth
 *
 */

const authRouter = express.Router();

authRouter.route('/signup').post(authController.signup);
authRouter.route('/login').post(authController.login);

module.exports = authRouter;
