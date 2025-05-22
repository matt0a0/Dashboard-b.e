import React, { useState } from 'react';
import MiniMap from './MiniMap';
import './HistoricalPage.css';

const HistoricalPage = () => {
  // Exemplo de dados históricos
  const historyData = [
    { 
      id: 1, 
      date: '2023-03-21', 
      location: 'Local 1', 
      moreInfo: 'Detalhes sobre o local 1. Uma rota marítima a ser seguida.', 
      position: [-1.47729, -48.45399],
      route: [
        [-1.47729, -48.45399],
        [-1.47900, -48.45500]
      ]
    },
    { 
      id: 2, 
      date: '2023-03-22', 
      location: 'Local 2', 
      moreInfo: 'Informações sobre o local 2. Uma nova rota marítima.', 
      position: [-1.48000, -48.45600],
      route: [
        [-1.48000, -48.45600],
        [-1.48200, -48.45800]
      ]
    },
  ];

  const [expandedItem, setExpandedItem] = useState(null);

  const handleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="historical-page">
      <h2>Histórico de Localizações</h2>
      <div className="historical-list">
        {historyData.map(item => (
          <div key={item.id} className="historical-item">
            <div className="historical-item-header" onClick={() => handleExpand(item.id)}>
              <span>{item.date} - {item.location}</span>
              <button>{expandedItem === item.id ? 'Esconder' : 'Expandir'}</button>
            </div>
            {expandedItem === item.id && (
              <div className="historical-item-expanded">
                <p>{item.moreInfo}</p>
                <div className="mini-map-container">
                  <MiniMap 
                    id={item.id} 
                    position={item.position} 
                    zoom={13} 
                    routePoints={item.route} 
                    info={item.moreInfo} 
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalPage;
