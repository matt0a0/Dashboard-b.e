import React from 'react';
import ChartComponent from './ChartComponent';

const MotorTempChart = ({ currentTemp, historyData, loading, minY, maxY }) => {
  const chartOptions = {
    title: `Temp. Motor: ${(!loading && currentTemp != null) ? currentTemp.toFixed(1) + '°C' : '---'}`,
    label: 'Temp. Motor (°C)',
    datasetOptions: { borderColor: '#f39c12', backgroundColor: 'rgba(243, 156, 18, 0.3)', fill: true },
    scales: { y: { min: minY, max: maxY } },
  };
  return <ChartComponent data={historyData} options={chartOptions} loading={loading} />;
};
export default MotorTempChart;
