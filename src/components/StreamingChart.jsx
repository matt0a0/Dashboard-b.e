import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // Essencial para o eixo de tempo
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Adaptador para o TimeScale

// Regista todos os componentes necessários no Chart.js
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale
);

const StreamingChart = ({ latestValue, options }) => {
  const chartRef = useRef(null); // Ref para a instância do gráfico
  const latestValueRef = useRef(latestValue); // Ref para o valor mais recente

  // Mantém a ref do valor atualizada sem causar re-renderizações
  useEffect(() => {
    latestValueRef.current = latestValue;
  }, [latestValue]);

  // Efeito principal que configura e limpa o intervalo de atualização do gráfico
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    // Intervalo que atualiza o gráfico a cada segundo
    const interval = setInterval(() => {
      // Adiciona o novo ponto de dados
      chart.data.datasets.forEach(dataset => {
        dataset.data.push({
          x: Date.now(),
          y: latestValueRef.current ?? 0, // Usa o valor atual ou 0 se for nulo
        });
      });

      // Remove o ponto de dados mais antigo para criar o efeito de janela deslizante
      // A duração da janela é (refresh_interval * max_data_points), ex: 1s * 20 = 20 segundos
      const maxDataPoints = 20;
      if (chart.data.datasets[0].data.length > maxDataPoints) {
        chart.data.datasets.forEach(dataset => {
          dataset.data.shift();
        });
      }

      // Limpa a ref do valor para garantir que o próximo ponto será 0 se não houver novos dados
      latestValueRef.current = null;
      
      // Atualiza o gráfico sem uma animação de "reset", para uma transição suave
      chart.update('quiet');
    }, 1000); // Atualiza a cada 1000ms (1 segundo)

    // Função de limpeza para parar o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []); // O array vazio [] garante que este efeito só corre uma vez (na montagem)

  // Opções do Chart.js configuradas para um eixo de tempo
  const chartOptionsConfig = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: options?.plugins?.legend?.display !== undefined ? options.plugins.legend.display : true,
        labels: { color: 'var(--text-primary)' }
      },
      title: {
        display: !!options?.title,
        text: options?.title || '',
        color: 'var(--text-primary)',
        font: { size: 16 }
      },
    },
    scales: {
      x: {
        type: 'time', // Usando o tipo de eixo de tempo nativo do Chart.js
        time: {
          unit: 'second',
          displayFormats: {
            second: 'HH:mm:ss' // Formato do rótulo no eixo
          },
          tooltipFormat: 'HH:mm:ss'
        },
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
      },
      y: {
        title: {
          display: !!options?.yAxisLabel,
          text: options?.yAxisLabel || 'Valor',
          color: 'var(--text-secondary)'
        },
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
      }
    }
  };
  
  const initialData = {
    datasets: [{
      label: options.label || 'Dataset',
      data: [],
      ...(options.datasetOptions || {})
    }]
  };

  return <Line ref={chartRef} data={initialData} options={chartOptionsConfig} />;
};

export default StreamingChart;

