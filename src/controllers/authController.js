'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { models } = require('../db');

const BCRYPT_SALT = 12;

const login = async (req, res) => {
  // If user filled the fields
  const { name, password } = req.body;
  if ((!name, !password))
    return res.status(400).json({
      status: 'fail',
      message: 'Please enter enter or/and password',
    });

  // Check if user exists and passwords are correct
  const user = await models.user.findOne({ where: { name } });
  console.log(user);
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
};

const signup = async (req, res) => {
  // Check if user already exists
  const { name, password } = req.body;
  const user = await models.user.findOne({ where: { name } });
  console.log(user);
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
};

module.exports = {
  signup,
  login,
};
