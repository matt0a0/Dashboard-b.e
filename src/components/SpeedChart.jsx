import React from 'react';
import ChartComponent from './ChartComponent';

const SpeedChart = ({ currentValue, historyData, loading, title }) => {
  const chartOptions = {
    title: `${title}: ${(!loading && currentValue != null) ? currentValue : '---'}`,
    label: title,
    datasetOptions: { borderColor: '#2ecc71', backgroundColor: 'rgba(46, 204, 113, 0.3)', fill: true },
  };
  return <ChartComponent data={historyData} options={chartOptions} loading={loading} />;
};
export default SpeedChart;
