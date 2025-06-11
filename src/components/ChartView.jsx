import React from 'react';
import MotorTempChart from './MotorTempChart';
import ControlTempChart from './ControlTempChart';
import BatteryStatus from './BatteryStatus';
import SpeedChart from './SpeedChart';
import WavesChart from './WavesChart';
import Compass from './Compass';
import AutonomiaChart from './AutonomiaChart';
import CapacidadeRestanteChart from './CapacidadeRestanteChart';

const ChartView = ({ selectedChart, history, latestData, loading }) => {
  const PONTOS_HISTORICO_INDIVIDUAL = 30;
  const slicedHistory = history.slice(-PONTOS_HISTORICO_INDIVIDUAL);

  switch (selectedChart) {
    case 'battery': return <BatteryStatus percentage={latestData?.Volt} historyData={slicedHistory.map(h => h?.Volt ?? 0)} loading={loading} />;
    case 'motorTemp': return <MotorTempChart currentTemp={latestData?.Motor_Temp_C} historyData={slicedHistory.map(h => h?.Motor_Temp_C ?? 0)} loading={loading} />;
    case 'speed': return <SpeedChart currentValue={latestData?.Speed_KPH} historyData={slicedHistory.map(h => h?.Speed_KPH ?? 0)} title="Velocidade do Barco (KPH)" loading={loading} />;
    case 'motorSpeed': return <SpeedChart currentValue={latestData?.Motor_Speed_RPM} historyData={slicedHistory.map(h => h?.Motor_Speed_RPM ?? 0)} title="Velocidade do Motor (RPM)" loading={loading} />;
    case 'controlTemp': return <ControlTempChart currentTemp={latestData?.Ctrl_Temp_C} historyData={slicedHistory.map(h => h?.Ctrl_Temp_C ?? 0)} loading={loading} />;
    case 'waves': return <WavesChart currentValue={latestData?.Current} historyData={slicedHistory.map(h => h?.Current ?? 0)} loading={loading} />;
    case 'autonomia': return <AutonomiaChart currentValue={latestData?.Autonomia} historyData={slicedHistory.map(h => h?.Autonomia ?? 0)} loading={loading} />;
    case 'capacidade': return <CapacidadeRestanteChart currentValue={latestData?.Capacidade_Restante} historyData={slicedHistory.map(h => h?.Capacidade_Restante ?? 0)} loading={loading} />;
    case 'navigation': return <Compass heading={latestData?.Heading ?? 0} loading={loading} />;
    default: return <div className="content-placeholder">Selecione um indicador para ver em detalhe.</div>;
  }
};
export default ChartView;
