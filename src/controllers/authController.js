'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { models } = require('../db');
// const AppError = require('../helpers/error.helper');

const BCRYPT_SALT = 12;

const signup = async (req, res) => {
  // Check if user already exists
  const user = await models.user.findOne({ name: req.body.name });
  if (user)
    return res.status(400).json({
      status: 'fail',
      message: 'User already exists',
    });

  // Create new user
  const passwordHashed = await bcrypt.hash(req.body.password, BCRYPT_SALT);
  console.log(passwordHashed);
  const newUser = await models.user.create({
    name: req.body.name,
    password: passwordHashed,
  });

  // Send token
  const token = jwt.sign({ name: req.body.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
};

module.exports = {
  signup,
};
