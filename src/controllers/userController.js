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

module.exports = {
  getAllUsers,
};
