import React from 'react';
import ChartComponent from './ChartComponent';

const ControlTempChart = ({ data }) => {
  if (!data || data.length === 0) return <div>Sem dados de temperatura do controle</div>;

  const chartData = {
    labels: data.map((_, i) => `Ponto ${i + 1}`),
    datasets: [
      {
        label: 'Temperatura do Controle (°C)',
        data: data,
        backgroundColor: 'var(--accent-primary)',
        borderColor: 'var(--accent-primary)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return <ChartComponent data={chartData} area={true} />;
};

export default ControlTempChart;
