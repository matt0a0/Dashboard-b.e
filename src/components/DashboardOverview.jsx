import React from 'react';

// Importe os componentes que você quer mostrar nesta "visão geral" ou página de configuração
import BatteryStatus from './BatteryStatus';
import MotorTempChart from './MotorTempChart';
import SpeedChart from './SpeedChart';
import WindSpeedChart from './WindSpeedChart';

const DashboardOverview = ({ history, latestData, loading, error }) => {
  
  if (loading) return <div style={{color: 'var(--text-secondary)', padding: '20px'}}>Carregando dados para visão geral...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>Erro: {error}</div>;
  if (!latestData) return <div style={{color: 'var(--text-secondary)', padding: '20px'}}>Aguardando dados do servidor para visão geral...</div>;

  // Prepara os dados para os componentes que serão exibidos aqui
  const batteryPercentage = latestData.Volt ?? null;
  const batteryHistory = Array.isArray(history) ? history.map(h => (h && h.Volt !== undefined ? h.Volt : 0)) : [];

  const motorTempCurrent = latestData.Motor_Temp_C ?? null;
  const motorTempHistory = Array.isArray(history) ? history.map(h => (h && h.Motor_Temp_C !== undefined ? h.Motor_Temp_C : 0)) : [];
  
  const boatSpeedCurrent = latestData.Speed_KPH ?? null;
  const boatSpeedHistory = Array.isArray(history) ? history.map(h => (h && h.Speed_KPH !== undefined ? h.Speed_KPH : 0)) : [];

  const WindSpeedChartHistory = Array.isArray(history) 
    ? history.map(h => (h && (h.Wind_Speed_KNOTS !== undefined ? h.Wind_Speed_KNOTS : h.Current)) ?? 0) 
    : [];

  return (
    <div className="dashboard-overview-container p-4" style={{color: 'var(--text-primary)'}}> 
      <h1 className="text-2xl font-semibold mb-6">Visão Geral / Configurações</h1>
      
      {/* Use um sistema de grid ou flex para organizar os componentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="p-3 bg-[var(--bg-panel)] rounded-lg shadow">
          <BatteryStatus
            percentage={batteryPercentage}
            historyData={batteryHistory}
          />
        </div>

        <div className="p-3 bg-[var(--bg-panel)] rounded-lg shadow">
          <MotorTempChart
            currentTemp={motorTempCurrent}
            historyData={motorTempHistory}
          />
        </div>
        
        <div className="p-3 bg-[var(--bg-panel)] rounded-lg shadow">
          <SpeedChart 
            currentValue={boatSpeedCurrent}
            historyData={boatSpeedHistory}
            title="Velocidade do Barco (KPH)" 
          />
        </div>
        
        <div className="p-3 bg-[var(--bg-panel)] rounded-lg shadow">
          <WindSpeedChart 
            currentValue={WindSpeedChart}
            historyData={WindSpeedChartHistory}
            title="Velocidade do Barco (KPH)" 
          />
        </div>

        <div className="p-3 bg-[var(--bg-panel)] rounded-lg shadow text-[var(--text-secondary)] md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">Opções de Configuração</h3>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
