// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;
const uri = process.env.MONGO_URI;
const collectionName = process.env.COLLECTION_NAME;

mongoose.connect(uri, {})
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.error("Erro na conexão com o MongoDB:", err));

const dadoSchema = new mongoose.Schema({
    Timestamp:	String,
    Speed_KPH:	Number,
    Motor_Speed_RPM: Number,
    Motor_Temp_C: Number,
    Ctrl_Temp_C: Number,
    Volt: Number,
    Current: Number,
    Speed_Mode: String,
});

const Dado = mongoose.model('collection_dados', dadoSchema, collectionName);

// Retorna lista com todos os dados json
app.get('/dados', async (req, res) => {
  try {
    const dados = await Dado.find({})
      .sort({ Timestamp: -1 })
      .limit(100);
    res.json(dados.reverse()); // ordem cronológica
    console.log(dados); //dados-todos os dados, dados[0] - seleciona 1° dado json, dados[0].Volt - seleciona um valor
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// rota para json com timestamp e variável em 'campo'
app.get('/variavel', async (req, res) => {
  const campo = req.query.campo;

  if (!campo) {
    return res.status(400).json({ error: 'Campo não especificado na query. Ex: /variavel?campo=Volt' });
  }

  try {
    const dados = await Dado.find({})
      .sort({ Timestamp: -1 })
      .limit(100);

    const valores = dados.reverse().map(dado => ({
      timestamp: dado.Timestamp,
      valor: dado[campo],
    }));

    res.json(valores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados da variável' });
  }
});

// retorna lista com valores da variável em 'campo'
app.get('/variavel_lista', async (req, res) => {
  const campo = req.query.campo;

  if (!campo) {
    return res.status(400).json({ error: 'Campo não especificado na query. Ex: /variavel_lista?campo=Volt' });
  }
  try {
    const dados = await Dado.find({})
      .sort({ Timestamp: -1 })
      .limit(100);

    const valor = dados.map(dado => dado[campo]); 
    res.json(valor.reverse());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados de Volt' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});