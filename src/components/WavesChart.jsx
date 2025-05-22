// src/components/WavesChart.jsx
import React from 'react';
import ChartComponent from './ChartComponent';

const WavesChart = ({ data }) => {
  if (!data || data.length === 0) return <div>Sem dados de ondas</div>;

  const chartData = {
    labels: data.map((_, i) => `Ponto ${i + 1}`),
    datasets: [
      {
        label: 'Ondas',
        data: data.map((value, index) => ({ x: index, y: value })),
        backgroundColor: 'var(--accent-primary)',
        borderColor: 'var(--accent-primary)',
        borderWidth: 1,
        pointRadius: 5,
        showLine: false,
      },
    ],
  };

  return <ChartComponent data={chartData} scatter={true} />;
};

export default WavesChart;
