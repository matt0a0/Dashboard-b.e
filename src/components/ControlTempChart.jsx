import React from 'react';
import ChartComponent from './ChartComponent';

const ControlTempChart = ({ currentTemp, historyData, loading, minY, maxY }) => {
  const chartOptions = {
    title: `Temp. do Controlador: ${(!loading && currentTemp != null) ? currentTemp.toFixed(1) + '°C' : '---'}`,
    label: 'Temp. Controlador (°C)',
    datasetOptions: { borderColor: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.3)', fill: true },
    scales: { y: { min: minY, max: maxY } },
  };
  return <ChartComponent data={historyData} options={chartOptions} loading={loading} />;
};
export default ControlTempChart;