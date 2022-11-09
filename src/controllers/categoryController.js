'use strict';

const { Op } = require('sequelize');
const { models } = require('../../db');
const AppError = require('../helpers/error.helper');

const getAllCategories = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;
    else filter.userId = { [Op.is]: null };

    const categories = await models.category.findAll({ where: filter });
    res.status(200).json({
      status: 'success',
      message: 'Categories successfully returned',
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const category = await models.category.create({ name, userId });
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
