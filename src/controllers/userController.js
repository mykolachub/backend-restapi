'use strict';

const { models } = require('../db');
const AppError = require('../helpers/error.helper');

const getAllUsers = async (req, res) => {
  const users = await models.user.findAll();
  res.status(200).json({
    status: 'success',
    message: 'Users successfully returned',
    results: users.length,
    data: {
      users,
    },
  });
};

const getMe = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await models.user.create({ name });
    res.status(201).json({
      status: 'success',
      message: 'User successfully created',
      data: {
        user,
      },
    });
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getMe,
};
