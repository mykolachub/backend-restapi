'use strict';

const { records } = require('../data/db');

const getAllCategories = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: null,
    results: records.length,
    data: {
      records,
    },
  });
};

const createCategory = (req, res) => {
  const record = {
    id: 'record-' + Date.now(),
    name: req.body.name,
  };
  records.push(record);

  res.status(200).json({
    status: 'success',
    message: 'Category successfully created',
    data: {
      record,
    },
  });
};

module.exports = {
  getAllCategories,
  createCategory,
};
