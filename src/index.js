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

// get all recipes
server.get('/recetas', async (req, res) => {
  const select = 'SELECT * FROM recetas';
  const conn = await getConnection();
  const [result] = await conn.query(select);
  const numOfElements = result.length;
  conn.end();
  res.json({
    info: { count: numOfElements },
    results: result,
  });
});

// get recipe by id
server.get('/recetas/:id', async (req, res) => {
  const recipeId = req.params.id;
  const select = 'SELECT * FROM recetas WHERE id = ?';
  const conn = await getConnection();
  const [result] = await conn.query(select, [recipeId]);
  conn.end();
  res.json({
    results: result,
  });
});

// add new recipe
server.post('/recetas', async (req, res) => {
  const { nombre, ingredientes, instrucciones } = req.body;
  try {
    if (nombre !== '' && ingredientes !== '' && instrucciones !== '') {
      const insert = 'INSERT INTO recetas (nombre, ingredientes, instrucciones) VALUES(?,?,?)';
      const conn = await getConnection();
      const [result] = await conn.query(insert, [nombre, ingredientes, instrucciones]);
      conn.end();
      res.json({
        success: true,
        id: result.insertId,
      });
    } else {
      res.json({
        success: false,
        message: 'Faltan campos por rellenar',
      });
    }
  } catch (e) {
    res.json({
      success: false,
      message: `Hubo un error intentando crear la receta: ${e}`,
    });
  }
});

// update recipe
server.put('/recetas/:id', async (req, res) => {
  const recipeId = req.params.id;
  const { nombre, ingredientes, instrucciones } = req.body;
  try {
    const updateRecipe = 'update recetas SET nombre = ?, ingredientes = ?, instrucciones = ? WHERE id = ?';
    const conn = await getConnection();
    const [result] = await conn.query(updateRecipe, [nombre, ingredientes, instrucciones, recipeId]);
    res.json({
      success: true,
      message: `Receta actualizada correctamente`,
    });
  } catch (e) {
    res.json({
      success: false,
      message: `Hubo un error modificando la receta: ${e}`,
    });
  }
});

// delete recipe
server.delete('/recetas/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const deleteQ = 'DELETE FROM recetas WHERE id = ?';
    const conn = await getConnection();
    const [result] = await conn.query(deleteQ, [recipeId]);
    conn.end();
    res.json({
      success: true,
      message: 'Receta eliminada correctamente',
    });
  } catch (e) {
    res.json({
      success: false,
      message: 'Ha ocurrido un error',
    });
  }
});
