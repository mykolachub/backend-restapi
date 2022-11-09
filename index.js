'use strict';
require('dotenv').config();

const server = require('./server');
const db = require('./src/db');

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await db.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Unable to connect to the database:', error.message);
    process.exit(1);
  }
})();

server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

// Unhandled Application Errors
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
