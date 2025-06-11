import React from 'react';
import ChartComponent from './ChartComponent';

// Também recebe minY e maxY para manter a mesma escala
const ControlTempChart = ({ currentTemp, historyData, loading, minY, maxY }) => {
  const chartOptions = {
    title: `Temp. Controle: ${(!loading && currentTemp != null) ? currentTemp.toFixed(1) + '°C' : '---'}`,
    label: 'Temp. Controle (°C)',
    datasetOptions: {
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      fill: true,
    },
    scales: {
      y: {
        // Passa os mesmos min e max
        min: minY,
        max: maxY,
      },
    },
  };

  return <ChartComponent data={historyData} options={chartOptions} loading={loading} />;
};
export default ControlTempChart;
