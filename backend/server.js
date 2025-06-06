import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;
const uri = process.env.MONGO_URI;
const collectionName = process.env.COLLECTION_NAME;

mongoose.connect(uri, {})
.then(() => console.log("Conectado ao MongoDB com sucesso!"))
.catch((err) => console.error("Erro na conexão com o MongoDB:", err));

// <-- CORREÇÃO 1: O campo Timestamp foi alterado para o tipo 'Date'.
// Isto é essencial para que a ordenação cronológica funcione corretamente.
const dadoSchema = new mongoose.Schema({
    Timestamp:  Date, 
    Speed_KPH:  Number,
    Motor_Speed_RPM: Number,
    Motor_Temp_C: Number,
    Ctrl_Temp_C: Number,
    Volt: Number,
    Current: Number,
    Speed_Mode: String,
    // Adicione os outros campos que você tem, como Latitude, Longitude, Heading, etc.
});

const Dado = mongoose.model('Dado', dadoSchema, collectionName); // Nome do modelo alterado para 'Dado' por convenção

// <-- CORREÇÃO 2: A rota /dados agora ordena por um campo Date,
// garantindo que os dados mais recentes são sempre retornados.
app.get('/dados', async (req, res) => {
  try {
    const dados = await Dado.find({})
      .sort({ Timestamp: -1 }) // Agora ordena cronologicamente (do mais novo para o mais antigo)
      .limit(100); // Pega os 100 mais recentes

    // O frontend espera os dados do mais antigo para o mais novo para desenhar a linha do tempo.
    res.json(dados.reverse()); 

    // Log melhorado para debugging
    console.log(`${new Date().toISOString()}: Enviados ${dados.length} registos para o frontend.`);
  } catch (err) {
    console.error("Erro ao buscar dados na rota /dados:", err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});


// As outras rotas não são o foco principal, mas podem ser mantidas se você as utilizar.
// Rota para json com timestamp e variável em 'campo'
app.get('/variavel', async (req, res) => {
  const campo = req.query.campo;
  if (!campo) {
    return res.status(400).json({ error: 'Campo não especificado na query.' });
  }
  try {
    const dados = await Dado.find({}).sort({ Timestamp: -1 }).limit(100);
    const valores = dados.reverse().map(dado => ({
      timestamp: dado.Timestamp,
      valor: dado[campo],
    }));
    res.json(valores);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados da variável' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
