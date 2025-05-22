// backend/server.js

const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para CORS e JSON
app.use(cors());
app.use(express.json());

app.get('/dados', async (req, res) => {
  const { MONGO_URI, DBNAME, COLLECTION_NAME } = process.env;

  if (!MONGO_URI || !DBNAME || !COLLECTION_NAME) {
    return res.status(500).json({ erro: 'Variáveis de ambiente não definidas' });
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DBNAME);
    const collection = db.collection(COLLECTION_NAME);

    const dados = await collection.find({}).toArray();

    // Garante que o Content-Type seja corretamente identificado como JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ erro: 'Erro ao buscar dados no MongoDB' });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
