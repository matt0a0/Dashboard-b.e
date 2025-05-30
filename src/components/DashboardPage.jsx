import React from 'react';

// Importe os componentes que esta página usa
import MapComponent from './MapComponent';
import Compass from './Compass';
import AllCharts from './AllCharts';
import BatteryStatus from './BatteryStatus';
import SpeedChart from './SpeedChart';
import MotorTempChart from './MotorTempChart';
import ControlTempChart from './ControlTempChart';
import WavesChart from './WavesChart';
import WindSpeedChart from './WindSpeedChart';


const DashboardPage = ({ selectedChart, history, loading, error }) => {

  const latestData = history.length > 0 ? history[history.length - 1] : null;

  // A função que renderiza os gráficos agora vive aqui
  const renderSelectedChartContent = () => {
    if (loading && history.length === 0) return <div>Carregando dados...</div>;
    if (error) return <div style={{ color: 'red' }}>Erro: {error}</div>;
    if (!latestData) return <div>Aguardando dados...</div>;

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
          <div style={{ color: 'var(--text-secondary)', fontSize: '18px', textAlign: 'center' }}>
            Selecione um indicador no menu para visualizar o gráfico.
          </div>
        );
    }
  };

  return (
    <div className="content">
      <div className="map-container">
        <MapComponent />
      </div>
      <div className="grafico-container">{renderSelectedChartContent()}</div>
    </div>
  );
};

export default DashboardPage;