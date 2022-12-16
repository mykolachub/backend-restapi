'use strict';

const express = require('express');
const morgan = require('morgan');

const userRouter = require('./src/routes/userRouter');
const categoryRouter = require('./src/routes/categoryRouter');
const recordRouter = require('./src/routes/recordRouter');
const authRouter = require('./src/routes/authRouter');

const server = express();

// Middlewares
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/v1/auth', authRouter);
server.use('/api/v1/users', userRouter);
server.use('/api/v1/categories', categoryRouter);
server.use('/api/v1/records', recordRouter);

server.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'There is no such endpoint..',
    data: null,
  });
});

module.exports = server;
