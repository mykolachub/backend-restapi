'use strict';

const { records } = require('../data/db');

const getAllRecords = (req, res) => {
  let recs = [...records];

  // Filter: /api/v1/records?userId=...&caterodyId=...
  for (const key of Object.keys(req.query)) {
    recs = recs.filter((r) => r[key] === req.query[key]);
  }

  res.status(200).json({
    status: 'success',
    message: null,
    results: recs.length,
    data: {
      records: recs,
    },
  });
};

const createRecord = (req, res) => {
  const record = {
    id: 'record-' + Date.now(),
    userId: req.body.userId,
    categoryId: req.body.categoryId,
    createdAt: Date.now(),
    price: req.body.price,
  };
  records.push(record);

  res.status(201).json({
    status: 'success',
    message: 'Record created successfully',
    data: {
      record,
    },
  });
};

module.exports = {
  getAllRecords,
  createRecord,
};
