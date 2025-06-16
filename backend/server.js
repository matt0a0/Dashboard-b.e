import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;
const uri = process.env.MONGO_URI;
const collectionName = process.env.COLLECTION_NAME;

// Validação de variáveis de ambiente
if (!uri || !collectionName) {
  console.error("Erro: Variáveis de ambiente MONGO_URI e COLLECTION_NAME são obrigatórias.");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log("Backend: Conectado ao MongoDB com sucesso!"))
  .catch((err) => console.error("Backend: Erro na conexão com o MongoDB:", err));

// --- CORREÇÃO CRÍTICA: Timestamp é do tipo 'Date' para ordenação correta. ---
const dadoSchema = new mongoose.Schema({
    Timestamp:  { type: Date, required: true }, 
    Speed_KPH:  Number,
    Motor_Speed_RPM: Number,
    Motor_Temp_C: Number,
    Ctrl_Temp_C: Number,
    Volt: Number,
    Current: Number,
    Speed_Mode: String,
    Autonomia: Number,
    Capacidade_Restante: Number,

}, { timestamps: true }); // Adiciona createdAt e updatedAt automaticamente

const Dado = mongoose.model('Dado', dadoSchema, collectionName);

// Rota principal para buscar os dados do dashboard
app.get('/dados', async (req, res) => {
  try {
    const dados = await Dado.find({})
      .sort({ Timestamp: -1 }) // Ordena do mais novo para o mais antigo
      .limit(100); // Pega os 100 registos mais recentes

    // Retorna os dados na ordem cronológica (mais antigo primeiro) para o frontend
    res.json(dados.reverse()); 

    console.log(`${new Date().toISOString()}: [SUCESSO] Enviados ${dados.length} registos.`);
  } catch (err) {
    console.error("Backend: Erro ao buscar dados na rota /dados:", err);
    res.status(500).json({ error: 'Erro interno ao buscar dados do dashboard.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor do backend a rodar na porta ${PORT}`);
});
