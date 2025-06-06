import React from 'react';
import ChartComponent from './ChartComponent'; // Importa o novo componente genérico

const MotorTempChart = ({ currentTemp, historyData, loading }) => {
  const chartOptions = {
    title: `Temperatura do Motor: ${(!loading && currentTemp !== null) ? currentTemp.toFixed(1) + ' °C' : '---'}`,
    label: 'Temp. Motor (°C)',
    datasetOptions: {
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.3)',
      fill: true,
      pointRadius: 2,
    },
    scales: {
        y: { title: 'Temperatura (°C)' },
        x: { title: 'Leituras Recentes' }
    },
  };

  return (
    <ChartComponent
      type="line"
      data={historyData} // Passa o array do histórico
      options={chartOptions}
      loading={loading}
    />
  );
};

export default MotorTempChart;
