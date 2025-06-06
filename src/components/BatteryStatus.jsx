import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler
} from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler);

const BatteryPlaceholderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 4h-3V2h-4v2H7c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14h-2v-2h2v2zm0-4h-2V9h2v5z"/>
  </svg>
);

const BatteryStatus = ({ percentage, historyData, loading }) => {
  const [chartDataState, setChartDataState] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (Array.isArray(historyData)) {
      setChartDataState({
        labels: historyData.map((_, index) => index + 1),
        datasets: [{
          label: 'Histórico de Voltagem (V)',
          data: historyData,
          borderColor: loading || historyData.length === 0 ? 'var(--placeholder-bg)' : 'rgb(75, 192, 192)',
          backgroundColor: loading || historyData.length === 0 ? 'transparent' : 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          fill: true,
          pointRadius: loading || historyData.length === 0 ? 0 : 3,
        }],
      });
    } else {
      setChartDataState({
        labels: [],
        datasets: [{ label: 'Histórico de Voltagem (V)', data: [], borderColor: 'var(--placeholder-bg)' }],
      });
    }
  }, [historyData, loading]);

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    // Adicionando configuração de animação
    animation: {
      duration: 750, // Duração da animação (ex: 0.75 segundos)
      easing: 'linear', // Easing linear para uma transição constante
      // Para animações mais complexas ou reativas, pode-se usar onProgress ou onComplete
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: 'Voltagem (V)', color: loading || !historyData || historyData.length === 0 ? 'var(--text-placeholder)' : 'var(--text-secondary)' },
        ticks: { color: loading || !historyData || historyData.length === 0 ? 'var(--text-placeholder)' : 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
      },
      x: {
        title: { display: true, text: 'Leituras Anteriores', color: loading || !historyData || historyData.length === 0 ? 'var(--text-placeholder)' : 'var(--text-secondary)' },
        ticks: { color: loading || !historyData || historyData.length === 0 ? 'var(--text-placeholder)' : 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: { color: loading || !historyData || historyData.length === 0 ? 'var(--text-placeholder)' : 'var(--text-primary)' }
      },
      title: {
        display: true,
        text: `Bateria: ${loading ? '---' : (percentage !== null && percentage !== undefined ? percentage.toFixed(2) + ' V' : 'N/A')}`,
        color: loading || percentage === null || percentage === undefined ? 'var(--text-placeholder)' : 'var(--text-primary)',
        font: { size: 16 }
      },
      tooltip: {
        backgroundColor: 'var(--bg-dark)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-primary)',
        borderColor: 'var(--border-color)',
        borderWidth: 1
       }
    },
  };

  if (loading) {
    return (
      <div className="content-placeholder" style={{width: '100%', height: '100%'}}>
        <BatteryPlaceholderIcon />
        <span>Carregando Bateria...</span>
      </div>
    );
  }
  
  if (!Array.isArray(historyData)) {
     return (
      <div className="content-placeholder" style={{width: '100%', height: '100%'}}>
        <BatteryPlaceholderIcon />
        <span>Dados de bateria indisponíveis.</span>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, position: 'relative', minHeight: '150px' }}>
        <Line data={chartDataState} options={chartOptions} />
      </div>
    </div>
  );
};

export default BatteryStatus;
