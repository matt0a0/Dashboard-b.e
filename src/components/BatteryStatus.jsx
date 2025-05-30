import React, { useEffect, useState } from 'react';
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
  TimeScale // Adicionado para potencial uso de eixos de tempo
} from 'chart.js';
// Se for usar adaptadores de data (opcional, mas bom para eixos de tempo reais)
// import 'chartjs-adapter-date-fns';
// import { ptBR } from 'date-fns/locale';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const BatteryStatus = ({ percentage, historyData, latestTimestamp }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Para depuração: verifique as props recebidas
  // console.log('BatteryStatus props:', { percentage, historyData, latestTimestamp });

  useEffect(() => {
    // Verifica se historyData é um array antes de usá-lo
    if (Array.isArray(historyData)) {
      if (historyData.length > 0) {
        setChartData({
          // Se você tiver timestamps, use-os. Caso contrário, índices.
          labels: historyData.map((_, index) => index + 1), // Exemplo: Rótulos como 1, 2, 3...
          // Se tiver timestamps: historyData.map(entry => entry.timestamp)
          datasets: [
            {
              label: 'Histórico de Voltagem (V)',
              data: historyData, // historyData deve ser um array de números (voltagens)
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } else {
        // historyData é um array vazio
        setChartData({
          labels: [],
          datasets: [{ label: 'Histórico de Voltagem (V)', data: [], borderColor: 'rgb(75, 192, 192)' }],
        });
      }
    } else {
      // historyData é undefined ou não é um array
      // console.warn('BatteryStatus: historyData está indefinido ou não é um array.', historyData);
      // Define um estado padrão vazio para o gráfico
      setChartData({
          labels: [],
          datasets: [{ label: 'Histórico de Voltagem (V)', data: [], borderColor: 'rgb(75, 192, 192)' }],
      });
    }
  }, [historyData]); // Re-executa o efeito quando historyData mudar

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: false, // Pode ser true se a voltagem nunca for negativa
        title: {
          display: true,
          text: 'Voltagem (V)',
          color: 'var(--text-secondary)'
        },
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
      },
      x: {
        title: {
          display: true,
          text: 'Leituras Anteriores', // Ajuste se tiver timestamps
          color: 'var(--text-secondary)'
        },
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
        // Se usar timestamps:
        // type: 'time',
        // time: {
        //   unit: 'minute', // ou 'second', 'hour', etc.
        //   tooltipFormat: 'PPpp', // Formato do tooltip
        //   displayFormats: {
        //     minute: 'HH:mm'
        //   }
        // },
        // adapters: {
        //   date: {
        //     locale: ptBR, // Se usar date-fns e quiser localização
        //   },
        // },
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'var(--text-primary)'
        }
      },
      title: {
        display: true,
        text: `Status da Bateria: ${percentage !== undefined && percentage !== null ? percentage.toFixed(2) : 'N/A'} V`,
        color: 'var(--text-primary)',
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

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '5px' }}>
      <div style={{ flexGrow: 1, position: 'relative', minHeight: '200px' }}> {/* Garante altura mínima */}
        {/* Renderiza o gráfico apenas se houver dados ou se historyData for um array vazio (para mostrar um gráfico vazio) */}
        {(Array.isArray(historyData)) ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-secondary)'}}>
            Dados do histórico de bateria indisponíveis.
          </p>
        )}
      </div>
    </div>
  );
};

export default BatteryStatus;
