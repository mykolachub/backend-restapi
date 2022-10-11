'use strict';

const { users } = require('../data/db');

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: null,
    results: users.length,
    data: {
      users,
    },
  });
};

const createUser = (req, res) => {
  const user = {
    id: 'user-' + Date.now(),
    name: req.body.name,
  };

  users.push(user);

  res.status(201).json({
    status: 'success',
    message: 'User successfully created',
    data: {
      user,
    },
  });
};

module.exports = {
  getAllUsers,
  createUser,
};
