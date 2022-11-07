'use strict';

const { models } = require('../../db');
const AppError = require('../helpers/error.helper');

const getAllCategories = async (req, res) => {
  const categories = await models.category.findAll();
  res.status(200).json({
    status: 'success',
    message: 'Categories successfully returned',
    results: categories.length,
    data: {
      categories,
    },
  });
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await models.category.create({ name });
    res.status(200).json({
      status: 'success',
      message: 'Category successfully created',
      data: {
        category,
      },
    });
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};
