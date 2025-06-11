import React from 'react';
import ChartComponent from './ChartComponent';

const AutonomiaChart = ({ currentValue, historyData, loading }) => {
  const chartOptions = {
    title: `Autonomia: ${(!loading && currentValue != null) ? currentValue.toFixed(1) + ' h' : '---'}`,
    label: 'Autonomia (h)',
    datasetOptions: {
      borderColor: '#1abc9c', // Cor Ciano
      backgroundColor: 'rgba(26, 188, 156, 0.3)',
      fill: true,
    },
  };

  return <ChartComponent data={historyData} options={chartOptions} loading={loading} />;
};
export default AutonomiaChart;
