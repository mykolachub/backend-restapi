'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { models } = require('../db');
const AppError = require('../helpers/error.helper');

const BCRYPT_SALT = 12;

const login = async (req, res) => {
  try {
    // If user filled the fields
    const { name, password } = req.body;
    if (!name || !password)
      return res.status(400).json({
        status: 'fail',
        message: 'Please enter enter or/and password',
      });

    // Check if user exists and passwords are correct
    const user = await models.user.findOne({ where: { name } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });

    // Send token
    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

const signup = async (req, res) => {
  try {
    // If user filled the fields
    const { name, password } = req.body;
    if (!name || !password)
      return res.status(400).json({
        status: 'fail',
        message: 'Please enter enter or/and password',
      });

    // Check if user already exists
    const user = await models.user.findOne({ where: { name } });
    if (user)
      return res.status(400).json({
        status: 'fail',
        message: 'User already exists',
      });

    // Create new user
    const passwordHashed = await bcrypt.hash(password, BCRYPT_SALT);
    const newUser = await models.user.create({
      name,
      password: passwordHashed,
    });

    // Send token
    const token = jwt.sign({ name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

// Middleware for protecting endpoints
const protect = async (req, res, next) => {
  try {
    // Getting token
    const { authorization: auth } = req.headers;
    const token = auth && auth.startsWith('Bearer') ? auth.split(' ')[1] : null;
    if (!token)
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in',
      });

    // Token validation
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If user still exists
    const user = await models.user.findOne({ where: { name: decoded.name } });
    if (!user)
      return res.status(401).json({
        status: 'fail',
        message: 'User doen not exist already',
      });

    req.user = user;
    next();
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

module.exports = {
  signup,
  login,
  protect,
};
