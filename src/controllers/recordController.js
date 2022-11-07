'use strict';

const { models } = require('../../db');
const AppError = require('../helpers/error.helper');

const getAllRecords = async (req, res) => {
  try {
    const { userId, categoryId } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;
    if (categoryId) filter.categoryId = categoryId;

    const records = await models.record.findAll({
      where: filter,
      include: [models.user, models.category],
    });

    res.status(200).json({
      status: 'success',
      message: null,
      results: records.length,
      data: {
        records,
      },
    });
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

const createRecord = async (req, res) => {
  try {
    const { userId, categoryId, price } = req.body;
    const record = await models.record.create({ price, userId, categoryId });
    res.status(201).json({
      status: 'success',
      message: 'Record created successfully',
      data: {
        record,
      },
    });
  } catch (error) {
    const { message, code } = AppError(error);
    res.status(code).json(message);
  }
};

module.exports = {
  getAllRecords,
  createRecord,
};
