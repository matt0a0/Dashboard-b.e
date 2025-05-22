import React from 'react';
import ChartComponent from './ChartComponent';

const WindSpeedChart = ({ data }) => {
  if (!data || data.length === 0) return <div>Sem dados de velocidade do vento</div>;

  const chartData = {
    labels: data.map((_, i) => `Ponto ${i + 1}`),
    datasets: [
      {
        label: 'Velocidade do Vento',
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

export default WindSpeedChart;
