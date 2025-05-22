import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import UserMenu from './components/UserMenu';
import MapComponent from './components/MapComponent';
import Compass from './components/Compass';
import DashboardOverview from './components/DashboardOverview';
import HistoricalPage from './components/HistoricalPage';

import BatteryStatus from './components/BatteryStatus';
import SpeedChart from './components/SpeedChart';
import MotorTempChart from './components/MotorTempChart';
import ControlTempChart from './components/ControlTempChart';
import WavesChart from './components/WavesChart';
import WindSpeedChart from './components/WindSpeedChart';

import AllCharts from './components/AllCharts';

const App = () => {
  const location = useLocation();
  const [selectedChart, setSelectedChart] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5000/dados');
        if (res.data && res.data.length > 0) {
          setHistory(prev => {
            const newEntry = res.data[res.data.length - 1];
            const maxSize = 100;
            return [...prev, newEntry].slice(-maxSize);
          });
          setError(null);
        } else {
          setError('Nenhum dado recebido do servidor');
        }
      } catch (err) {
        setError('Erro ao buscar dados: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const latestData = history.length > 0 ? history[history.length - 1] : null;

  const renderSelectedChartContent = () => {
    if (loading) return <div>Carregando dados...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
    if (!latestData) return <div>Nenhum dado disponível</div>;

    if (selectedChart === 'all') {
      return <AllCharts history={history} />;
    }

    switch (selectedChart) {
      case 'battery':
        return <BatteryStatus percentage={latestData.Volt ?? 0} historyData={history.map(h => h.Volt ?? 0)} />;
      case 'speed':
        return <SpeedChart data={[latestData.Speed_KPH ?? 0]} title="Velocidade do Barco (KPH)" />;
      case 'motorSpeed':
        return <SpeedChart data={[latestData.Motor_Speed_RPM ?? 0]} title="Velocidade do Motor (RPM)" />;
      case 'motorTemp':
        return <MotorTempChart data={[latestData.Motor_Temp_C ?? 0]} />;
      case 'controlTemp':
        return <ControlTempChart data={[latestData.Ctrl_Temp_C ?? 0]} />;
      case 'waves':
        return <WavesChart data={[latestData.Current ?? 0]} />;
      case 'windSpeed':
        return <WindSpeedChart data={[latestData.Current ?? 0]} />;
      case 'navigation':
        return <Compass />;
      default:
        return (
          <div style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
            Selecione um indicador no menu para visualizar o gráfico.
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="menu-container">
        {(location.pathname === '/historico' || location.pathname === '/configuracao') && (
          <Link to="/" className="menu" style={{ marginBottom: '10px' }}>
            Voltar ao Início
          </Link>
        )}

        <UserMenu />

        {location.pathname !== '/historico' && location.pathname !== '/configuracao' && (
          <>
            <button className="menu" onClick={() => setSelectedChart('battery')}>
              Status da Bateria
            </button>
            <button className="menu" onClick={() => setSelectedChart('speed')}>
              Velocidade do Barco
            </button>
            <button className="menu" onClick={() => setSelectedChart('motorSpeed')}>
              Velocidade do Motor
            </button>
            <button className="menu" onClick={() => setSelectedChart('motorTemp')}>
              Temperatura do Motor
            </button>
            <button className="menu" onClick={() => setSelectedChart('controlTemp')}>
              Temperatura do Controle
            </button>
            <button className="menu" onClick={() => setSelectedChart('windSpeed')}>
              Velocidade do Vento
            </button>
            <button className="menu" onClick={() => setSelectedChart('waves')}>
              Ondas
            </button>
            <button className="menu" onClick={() => setSelectedChart('navigation')}>
              Navegação
            </button>
            <button className="menu" onClick={() => setSelectedChart('all')}>
              Todos os Gráficos
            </button>
          </>
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="content">
              <div className="map-container">
                <MapComponent />
              </div>
              <div className="grafico-container">{renderSelectedChartContent()}</div>
            </div>
          }
        />
        <Route path="/historico" element={<HistoricalPage />} />
        <Route path="/configuracao" element={<DashboardOverview />} />
      </Routes>
    </div>
  );
};

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
