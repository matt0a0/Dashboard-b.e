import React from 'react';

// Importe os componentes de gráfico que o DashboardOverview vai usar
import BatteryStatus from './BatteryStatus';
// import OutroGrafico from './OutroGrafico'; // Exemplo

// Importe o CSS específico para este componente, se houver
// import './DashboardOverview.css'; 

// DashboardOverview agora recebe props
const DashboardOverview = ({ history, latestData }) => {
  
  // Prepara os dados para BatteryStatus
  // Verifica se latestData e latestData.Volt existem antes de tentar aceder
  const batteryPercentage = latestData && latestData.Volt !== undefined ? latestData.Volt : null;
  
  // Garante que batteryHistoryData seja um array, mesmo que history seja null/undefined no início.
  // E também verifica se cada item 'h' em history existe antes de aceder 'h.Volt'.
  const batteryHistoryData = Array.isArray(history) 
    ? history.map(h => (h && h.Volt !== undefined ? h.Volt : 0)) 
    : [];

  // Para depuração:
  // console.log('DashboardOverview props:', { history, latestData });
  // console.log('Dados para BatteryStatus:', { batteryPercentage, batteryHistoryData });

  return (
    // Adicione uma classe container se necessário para estilização
    <div className="dashboard-overview-container p-4"> 
      <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">Visão Geral / Configuração</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="grid-item item-bateria p-3 bg-[var(--bg-panel)] rounded-lg shadow">
       
          <BatteryStatus
            percentage={batteryPercentage}
            historyData={batteryHistoryData}
            // latestTimestamp={latestData ? latestData.timestamp : null} // Se tiver timestamp
          />
        </div>
        <div className="p-3 bg-[var(--bg-panel)] rounded-lg shadow text-[var(--text-secondary)]">
          Mais conteúdo de configuração ou visão geral pode ser adicionado aqui.
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
