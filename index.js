'use strict';
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const server = express();

// Middlewares
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
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
