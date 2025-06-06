import React from 'react';

// Importe todos os componentes de gráfico individuais que você quer mostrar
import BatteryStatus from './BatteryStatus';
import MotorTempChart from './MotorTempChart';
import SpeedChart from './SpeedChart';
import WindSpeedChart from './WindSpeedChart';
import WavesChart from './WavesChart';
import ControlTempChart from './ControlTempChart';
import Compass from './Compass';

// Opcional, se algum dos seus componentes específicos o utilizar internamente
// import ChartComponent from './ChartComponent';

const AllCharts = ({ history, latestData, loading }) => {
  // Define quantos pontos do histórico recente mostrar nos mini-gráficos
  // Isto ajuda a dar a sensação de "janela deslizante" dos dados.
  const PONTOS_HISTORICO_MINI = 10; // Ex: mostrar os últimos 10 pontos

  // Se estiver a carregar os dados iniciais (sem histórico ainda), mostra placeholders para a grelha.
  if (loading && (!history || history.length === 0)) {
    return (
      <div className="all-charts-container">
        {Array.from({ length: 8 }).map((_, index) => ( // 8 é o número de gráficos em chartsToDisplay
          <div key={index} className="chart-item">
            <div className="content-placeholder" style={{width: '100%', height: '100%'}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: '32px', height: '32px', opacity: '0.5', marginBottom: '8px'}}><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6zm-1-4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM7 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm7.5-3.5C15.33 6.5 16 7.17 16 8s-.67 1.5-1.5 1.5S13 8.83 13 8s.67-1.5 1.5-1.5zM3 14c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" /></svg>
              <span>Carregando...</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Se não estiver carregando, mas ainda não houver `latestData` (ex: primeira resposta vazia do backend).
  if (!latestData) {
    return <div className="content-placeholder" style={{width: '100%', height: '100%'}}>Aguardando dados do servidor...</div>;
  }

  // Prepara a fatia do histórico para os mini-gráficos.
  // .slice() cria um novo array, e .map() em seguida também cria novos arrays.
  // Passar novas referências de array para as props dos componentes filhos
  // é crucial para que o React e o Chart.js detetem as mudanças e iniciem as animações.
  const miniSlicedHistory = history.slice(-PONTOS_HISTORICO_MINI);

  const chartsToDisplay = [
    {
      id: 'battery',
      component: <BatteryStatus 
                    percentage={latestData.Volt ?? null} 
                    historyData={miniSlicedHistory.map(h => (h && h.Volt !== undefined ? h.Volt : 0))}
                    // A prop 'loading' para o filho reflete o estado de carregamento global.
                    // Se 'latestData' existe, o filho não está "carregando" no sentido de não ter dados,
                    // mas pode estar se o 'loading' global ainda estiver ativo (ex: primeira carga).
                    loading={loading} 
                 />
    },
    {
      id: 'motorTemp',
      component: <MotorTempChart
                    currentTemp={latestData.Motor_Temp_C ?? null}
                    historyData={miniSlicedHistory.map(h => (h && h.Motor_Temp_C !== undefined ? h.Motor_Temp_C : 0))}
                    loading={loading}
                 />
    },
    {
      id: 'boatSpeed',
      component: <SpeedChart
                    currentValue={latestData.Speed_KPH ?? null}
                    historyData={miniSlicedHistory.map(h => (h && h.Speed_KPH !== undefined ? h.Speed_KPH : 0))}
                    title="Velocidade do Barco (KPH)"
                    loading={loading}
                 />
    },
    {
      id: 'motorSpeed',
       component: <SpeedChart 
                    currentValue={latestData.Motor_Speed_RPM ?? null} 
                    historyData={miniSlicedHistory.map(h => (h && h.Motor_Speed_RPM !== undefined ? h.Motor_Speed_RPM : 0))}
                    title="Velocidade do Motor (RPM)" 
                    loading={loading}
                 />
    },
    {
      id: 'controlTemp',
      component: <ControlTempChart
                    currentTemp={latestData.Ctrl_Temp_C ?? null}
                    historyData={miniSlicedHistory.map(h => (h && h.Ctrl_Temp_C !== undefined ? h.Ctrl_Temp_C : 0))}
                    loading={loading}
                 />
    },
    {
      id: 'waves',
      component: <WavesChart
                    currentValue={latestData.Current ?? null}
                    historyData={miniSlicedHistory.map(h => (h && h.Current !== undefined ? h.Current : 0))}
                    loading={loading}
                 />
    },
    {
      id: 'windSpeed',
      component: <WindSpeedChart
                    currentValue={latestData.Wind_Speed_KNOTS ?? latestData.Current ?? null}
                    historyData={miniSlicedHistory.map(h => (h && (h.Wind_Speed_KNOTS ?? h.Current)) ?? 0)}
                    loading={loading}
                 />
    },
    {
        id: 'compass',
        // Compass geralmente mostra apenas o valor atual, então a animação de "histórico" não se aplica da mesma forma.
        // Pode ter suas próprias animações internas se o valor 'heading' mudar.
        component: <Compass heading={latestData.Heading ?? 0} />
    }
  ];

  return (
    <div className="all-charts-container">
      {chartsToDisplay.map(chart => (
        <div key={chart.id} className="chart-item">
        </div>
      ))}
    </div>
  );
};

export default AllCharts;
