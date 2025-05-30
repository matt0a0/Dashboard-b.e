import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Importe os componentes de layout e PÁGINA
import Header from './components/Header'; // Certifique-se que este componente existe
import Sidebar from './components/Sidebar'; // Certifique-se que este componente existe e está correto
import DashboardPage from './components/DashboardPage'; // Certifique-se que este componente existe
import HistoricalPage from './components/HistoricalPage'; // Certifique-se que este componente existe
import DashboardOverview from './components/DashboardOverview'; // Este é usado para a página de Configuração

// Estilos globais, se App.css estiver na raiz de src/
import './App.css';


// Componente App principal. Ele não usa mais o useLocation diretamente.
const AppContent = () => {
  // Estado para os dados e seleção de gráfico
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null); // 'all', 'battery', etc.

  // Lógica para buscar os dados
  useEffect(() => {
    const fetchData = async () => {
      // Define o loading como true apenas na primeira busca ou se não houver histórico
      if (history.length === 0) {
        setLoading(true);
      }
      
      try {
        // Substitua pela URL correta do seu backend
        const res = await axios.get('http://localhost:5000/dados'); 
        if (res.data && res.data.length > 0) {
          // Assume que res.data é um array de objetos, e o último é o mais recente
          const newEntry = res.data[res.data.length - 1]; 
          
          // Adiciona nova entrada ao histórico, mantendo um tamanho máximo
          setHistory(prev => {
            const updatedHistory = [...prev, newEntry];
            const maxSize = 100; // Define o tamanho máximo do histórico
            return updatedHistory.slice(-maxSize); 
          });

          if(error) setError(null); // Limpa o erro se a conexão for bem sucedida
        } else {
          // Não define erro se for apenas uma resposta vazia, pode ser temporário
          // Poderia adicionar uma lógica para setError('Nenhum dado novo recebido') se desejado
        }
      } catch (err) {
        setError('Não foi possível conectar ao servidor. Verifique a conexão e o backend.');
        console.error("Erro ao buscar dados:", err);
      } finally {
        // Define loading como false após a primeira busca bem-sucedida ou falha
        if (loading) setLoading(false);
      }
    };

    fetchData(); // Busca inicial
    const interval = setInterval(fetchData, 5000); // Atualiza a cada 5 segundos
    
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [error, loading, history.length]); // Adicionamos history.length para reavaliar se o loading inicial deve ocorrer

  // Pega o dado mais recente do histórico
  const latestData = history.length > 0 ? history[history.length - 1] : null;

  return (
    <div className="app-container"> {/* Certifique-se que esta classe está definida no seu App.css */}
      <Header />
      <Sidebar selectedChart={selectedChart} onChartSelect={setSelectedChart} />

      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              selectedChart={selectedChart}
              history={history} // Passa o histórico completo
              latestData={latestData} // Passa o dado mais recente
              loading={loading && history.length === 0} // Loading só se não houver histórico ainda
              error={error}
            />
          }
        />
        <Route 
          path="/historico" 
          element={<HistoricalPage history={history} />} // Passa o histórico para a página de histórico
        />
        <Route
          path="/configuracao"
          element={
            <DashboardOverview 
              history={history} // Passa o histórico completo
              latestData={latestData} // Passa o dado mais recente
              // Se DashboardOverview renderizar outros gráficos, passe os dados necessários
            />
          }
        />
      </Routes>
    </div>
  );
};

// O componente raiz que provê o BrowserRouter
const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
