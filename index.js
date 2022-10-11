'use strict';
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const userRouter = require('./src/routes/userRouter');
const categoryRouter = require('./src/routes/categoryRouter');

const server = express();

// Middlewares
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/v1/users', userRouter);
server.use('/api/v1/categories', categoryRouter);

server.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'There is no such endpoint..',
    data: null,
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

// Unhandled Application Errors
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
