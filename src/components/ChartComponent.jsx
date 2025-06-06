import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const ChartComponent = ({ data, labels, type = 'line', options, loading }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const defaultDatasetOptions = { tension: 0.2, borderWidth: 2 };
    const currentDatasetOptions = { ...defaultDatasetOptions, ...(options?.datasetOptions || {}) };
    
    let processedLabels = labels;
    if (!processedLabels && Array.isArray(data) && data.length > 0) {
      processedLabels = data.map((_, index) => index + 1);
    } else if (!processedLabels) {
      processedLabels = [];
    }

    if (Array.isArray(data)) {
      setChartData({
        labels: processedLabels,
        datasets: [{
          label: options?.label || 'Dataset',
          data: data,
          ...currentDatasetOptions,
        }],
      });
    }
  }, [data, labels, options, type]);

  const chartJS_options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 800, // Animação suave para transição de dados
      easing: 'easeInOutQuad',
    },
    scales: {
      y: {
        title: { display: !!options?.scales?.y?.title, text: options?.scales?.y?.title || '', color: 'var(--text-secondary)' },
        ticks: { color: 'var(--text-primary)' }, // Cor do texto do eixo Y
        grid: { color: 'var(--border-color)' }
      },
      x: {
        title: { display: !!options?.scales?.x?.title, text: options?.scales?.x?.title || '', color: 'var(--text-secondary)' },
        ticks: { color: 'var(--text-primary)' }, // Cor do texto do eixo X
        grid: { color: 'var(--border-color)' }
      }
    },
    plugins: {
      legend: { labels: { color: 'var(--text-primary)' } }, // Cor do texto da legenda
      title: { display: !!options?.title, text: options?.title || '', color: 'var(--text-primary)', font: { size: 16 } },
      tooltip: { 
          backgroundColor: 'var(--bg-dark)', 
          titleColor: 'var(--text-primary)', 
          bodyColor: 'var(--text-primary)', 
          borderColor: 'var(--border-color)', 
          borderWidth: 1 
      }
    }
  };

  if (loading) return <div className="content-placeholder"><span>A carregar gráfico...</span></div>;

  const renderChart = () => {
    if (!Array.isArray(data) || data.length === 0) return <div className="content-placeholder"><span>Sem dados para exibir.</span></div>;
    if (type === 'line') return <Line data={chartData} options={chartJS_options} />;
    if (type === 'bar') return <Bar data={chartData} options={chartJS_options} />;
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, position: 'relative', minHeight: '150px' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartComponent;
