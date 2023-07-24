// Imports
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Start the server
const server = express();

// Server config
server.use(cors());
server.use(express.json({ limit: '25mb' }));

// Connect to DB
async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'recetas_db',
  });
  connection.connect();
  return connection;
}

// Listen to the server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}/`);
});

// Endpoints