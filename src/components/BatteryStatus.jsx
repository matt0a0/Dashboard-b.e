// src/components/BatteryStatus.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import './BatteryStatus.css'; // Criaremos este arquivo para estilização

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const BatteryStatus = ({ percentage, historyData }) => {

  // Configuração do gráfico de linha do histórico
  const chartData = {
    // Usar rótulos vazios ou índices para o eixo X (simulando tempo)
    labels: historyData.map((_, index) => index), // Simplesmente numerando os pontos
    datasets: [
      {
        label: 'Nível da Bateria (%)', // Ou 'Taxa de Carga/Descarga'
        data: historyData, // Os dados do histórico passados via prop
        borderColor: percentage > 20 ? 'rgba(52, 152, 219, 1)' : 'rgba(231, 76, 60, 1)', // Azul normal, Vermelho se baixo
        backgroundColor: percentage > 20 ? 'rgba(52, 152, 219, 0.2)' : 'rgba(231, 76, 60, 0.2)', // Área preenchida com transparência
        borderWidth: 2,
        fill: true, // Preenche a área abaixo da linha
        tension: 0.4, // Deixa a linha mais suave
        pointRadius: 0, // Esconde os pontos individuais na linha
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Permite controlar altura independentemente da largura
    scales: {
      y: { // Configurações do eixo Y (Porcentagem)
        beginAtZero: true, // Começa em 0%
        max: 100, // Vai até 100%
        ticks: {
          color: 'var(--text-secondary)', // Cor dos números do eixo
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.1)', // Cor das linhas de grade
        }
      },
      x: { // Configurações do eixo X (Tempo simulado)
        ticks: {
          display: false, // Esconde os rótulos do eixo X (índices)
        },
        grid: {
          display: false, // Esconde as linhas de grade verticais
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Esconde a legenda ("Nível da Bateria (%)")
      },
      tooltip: {
        enabled: false, // Desativa tooltips ao passar o mouse
      }
    }
  };

  // Determina o ícone da bateria baseado na porcentagem
  const getBatteryIcon = () => {
    if (percentage > 90) return 'fa-battery-full';
    if (percentage > 70) return 'fa-battery-three-quarters';
    if (percentage > 40) return 'fa-battery-half';
    if (percentage > 15) return 'fa-battery-quarter';
    return 'fa-battery-empty';
  };

  return (
    <div className="battery-status-container">
      {/* Lado Esquerdo: Porcentagem e Ícone */}
      <div className="battery-percentage-section">
        <i className={`fas ${getBatteryIcon()} battery-icon`}></i>
        <span className="battery-percentage-text">{percentage}%</span>
      </div>

      {/* Lado Direito: Gráfico de Histórico */}
      <div className="battery-history-chart-section">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BatteryStatus;