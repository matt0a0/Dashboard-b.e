import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BatteryStatus from './BatteryStatus';
import SpeedChart from './SpeedChart';
import MotorTempChart from './MotorTempChart';
import ControlTempChart from './ControlTempChart';
import WavesChart from './WavesChart';
import WindSpeedChart from './WindSpeedChart';
import Compass from './Compass';

// Caso não tenha esses componentes, crie mocks rápidos para teste:
const MockChart = ({ title, data }) => (
  <div style={{ border: '1px solid #ccc', padding: 10, margin: 5, flex: 1 }}>
    <h4>{title}</h4>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default function AllCharts() {
  const [history, setHistory] = useState([]); // armazena histórico completo dos dados recebidos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca dados a cada 5 segundos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/dados');
        if (res.data && res.data.length > 0) {
          setHistory(prev => {
            const newEntry = res.data[res.data.length - 1];
            const maxHistorySize = 100; // limite do histórico para não crescer demais
            const updated = [...prev, newEntry].slice(-maxHistorySize);
            return updated;
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

  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (history.length === 0) return <div>Nenhum dado disponível</div>;

  // Para passar para os gráficos, você pode extrair arrays dos campos do histórico:
  const batteryHistory = history.map(h => h.Volt ?? 0);
  const speedHistory = history.map(h => h.Speed_KPH ?? 0);
  const motorSpeedHistory = history.map(h => h.Motor_Speed_RPM ?? 0);
  const motorTempHistory = history.map(h => h.Motor_Temp_C ?? 0);
  const controlTempHistory = history.map(h => h.Ctrl_Temp_C ?? 0);
  const windSpeedHistory = history.map(h => h.Current ?? 0);
  const climateHistory = history.map(h => h.Climate_Temp ?? 0);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px' }}>
        <BatteryStatus percentage={batteryHistory[batteryHistory.length -1]} historyData={batteryHistory} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <SpeedChart data={speedHistory} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <SpeedChart data={motorSpeedHistory} title="Velocidade do Motor" />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <MotorTempChart data={motorTempHistory} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <ControlTempChart data={controlTempHistory} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <WavesChart data={windSpeedHistory} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <WindSpeedChart data={windSpeedHistory} />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <Compass />
      </div>
      <div style={{ flex: '1 1 300px' }}>
        <MockChart title="Clima (°C)" data={climateHistory} />
      </div>
    </div>
  );
}
