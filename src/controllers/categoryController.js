'use strict';

const { categories } = require('../data/db');

const getAllCategories = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: null,
    results: categories.length,
    data: {
      categories,
    },
  });
};

const createCategory = (req, res) => {
  const category = {
    id: 'category-' + Date.now(),
    name: req.body.name,
  };
  categories.push(category);

  res.status(200).json({
    status: 'success',
    message: 'Category successfully created',
    data: {
      categories,
    },
  });
};

module.exports = {
  getAllCategories,
  createCategory,
};
