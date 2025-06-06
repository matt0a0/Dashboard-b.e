import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Importe os seus componentes
import SponsorsScreen from './components/SponsorsScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import HistoricalPage from './components/HistoricalPage';
import DashboardOverview from './components/DashboardOverview';

// Estilos
import './App.css';

// Componente interno para gerir o conteúdo principal e o estado dos dados
const AppContent = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChart, setSelectedChart] = useState('all');
  const [showSponsors, setShowSponsors] = useState(true);

  // Usamos useCallback para memoizar a função fetchData.
  // Isto evita que ela seja recriada em cada renderização.
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/dados');
      if (res.data && Array.isArray(res.data)) {
        // --- CORREÇÃO PRINCIPAL ---
        // A lógica de comparação foi removida. Agora, simplesmente atualizamos o estado
        // com os novos dados recebidos. O método .slice() cria um novo array, o que
        // garante que o React detete a mudança e atualize a interface.
        setHistory(res.data.slice(-100));
        
        // Se a busca foi bem-sucedida, limpamos qualquer erro anterior.
        if (error) setError(null);
      }
    } catch (err) {
      setError('Não foi possível ligar ao servidor.');
      console.error("Erro ao buscar dados:", err);
    } finally {
      // O ecrã de "loading" inicial é desativado apenas uma vez.
      setLoading(false);
    }
  }, [error]); // A dependência 'error' permite tentar limpar um erro existente.

  // Este useEffect gere o ciclo de vida do 'setInterval' para a busca de dados.
  useEffect(() => {
    // Se o ecrã de patrocinadores estiver ativo, não fazemos nada.
    if (showSponsors) {
      return;
    }

    // Faz uma busca inicial assim que o ecrã de patrocinadores desaparece.
    fetchData();

    // Configura o intervalo para buscar dados periodicamente.
    const intervalId = setInterval(fetchData, 5000);

    // A função de limpeza é crucial: ela é chamada para parar o intervalo
    // e evitar problemas de memória ou execuções desnecessárias.
    return () => clearInterval(intervalId);
  }, [showSponsors, fetchData]); // O efeito depende de 'showSponsors' e da função 'fetchData'.

  const latestData = history.length > 0 ? history[history.length - 1] : null;

  const handleSponsorsFinished = () => {
    setShowSponsors(false);
  };

  if (showSponsors) {
    return <SponsorsScreen onFinished={handleSponsorsFinished} />;
  }

  return (
    <div className="app-container">
      <Header />
      <Sidebar selectedChart={selectedChart} onChartSelect={setSelectedChart} />
      <Routes>
        <Route 
          path="/" 
          element={
            <DashboardPage 
              history={history} 
              latestData={latestData} 
              selectedChart={selectedChart} 
              loading={loading && history.length === 0} 
              error={error}
            />
          } 
        />
        <Route 
          path="/historico" 
          element={<HistoricalPage history={history} />} 
        />
        <Route 
          path="/configuracao" 
          element={
            <DashboardOverview 
              history={history} 
              latestData={latestData} 
              loading={loading && history.length === 0} 
              error={error}
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
