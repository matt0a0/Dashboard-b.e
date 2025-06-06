import React from 'react';

// Importe TODOS os componentes que esta página pode precisar renderizar
import MapComponent from './MapComponent';
import Compass from './Compass';
import AllCharts from './AllCharts';
import BatteryStatus from './BatteryStatus';
import SpeedChart from './SpeedChart';
import MotorTempChart from './MotorTempChart';
import ControlTempChart from './ControlTempChart';
import WavesChart from './WavesChart';
import WindSpeedChart from './WindSpeedChart';

const DashboardPage = ({ selectedChart, history, latestData, loading, error }) => {
  // Define quantos pontos do histórico recente mostrar nos gráficos individuais
  const PONTOS_HISTORICO_INDIVIDUAL = 20;

  if (loading && (!history || history.length === 0)) return <div className="content-placeholder" style={{width: '100%', height: '100%'}}>A carregar dados iniciais...</div>;
  if (error) return <div className="content-placeholder" style={{width: '100%', height: '100%', color: 'red'}}>Erro: {error}</div>;
  if (!latestData && !loading) return <div className="content-placeholder" style={{width: '100%', height: '100%'}}>A aguardar dados do servidor...</div>;

  const renderSelectedChartContent = () => {
    if (selectedChart === 'all') {
      return <AllCharts history={history} latestData={latestData} loading={loading && (!history || history.length === 0)} />;
    }

    // Prepara a "janela deslizante" de dados para os gráficos individuais
    const slicedHistory = history.slice(-PONTOS_HISTORICO_INDIVIDUAL);

    switch (selectedChart) {
      case 'battery':
        return <BatteryStatus 
                    percentage={latestData?.Volt ?? null} 
                    historyData={slicedHistory.map(h => h?.Volt ?? 0)}
                    loading={loading && !latestData}
                />;
      case 'speed':
        return <SpeedChart 
                    currentValue={latestData?.Speed_KPH ?? null} 
                    historyData={slicedHistory.map(h => h?.Speed_KPH ?? 0)}
                    title="Velocidade do Barco (KPH)" 
                    loading={loading && !latestData}
                />;
      case 'motorSpeed':
        return <SpeedChart 
                    currentValue={latestData?.Motor_Speed_RPM ?? null} 
                    historyData={slicedHistory.map(h => h?.Motor_Speed_RPM ?? 0)}
                    title="Velocidade do Motor (RPM)" 
                    loading={loading && !latestData}
                />;
      case 'motorTemp':
        return <MotorTempChart 
                    currentTemp={latestData?.Motor_Temp_C ?? null}
                    historyData={slicedHistory.map(h => h?.Motor_Temp_C ?? 0)}
                    loading={loading && !latestData}
                />;
      case 'controlTemp':
        return <ControlTempChart 
                    currentTemp={latestData?.Ctrl_Temp_C ?? null}
                    historyData={slicedHistory.map(h => h?.Ctrl_Temp_C ?? 0)}
                    loading={loading && !latestData}
                />;
      case 'waves':
        return <WavesChart 
                    currentValue={latestData?.Current ?? null} 
                    historyData={slicedHistory.map(h => h?.Current ?? 0)}
                    loading={loading && !latestData}
                />;
      case 'windSpeed':
        return <WindSpeedChart 
                    currentValue={latestData?.Wind_Speed_KNOTS ?? latestData?.Current ?? null}
                    historyData={slicedHistory.map(h => h?.Wind_Speed_KNOTS ?? h?.Current ?? 0)}
                    loading={loading && !latestData}
                />;
      case 'navigation':
        return <Compass heading={latestData?.Heading ?? 0} />; 
      default:
        return (
          <div className="content-placeholder" style={{width: '100%', height: '100%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: '48px', height: '48px', opacity: '0.5', marginBottom: '8px'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            <span>Selecione um indicador no menu.</span>
          </div>
        );
    }
  };
  
  const contentClassName = `content ${selectedChart === 'all' ? 'all-charts-active' : ''}`;

  return (
    <div className={contentClassName}> 
      <div className="map-container">
        {loading && (!history || history.length === 0) ? (
            <div className="content-placeholder" style={{width: '100%', height: '100%'}}>A carregar Mapa...</div>
        ) : (
            <MapComponent 
                latitude={latestData?.Latitude} 
                longitude={latestData?.Longitude} 
            />
        )}
      </div>
      <div className="grafico-container">
        {renderSelectedChartContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
