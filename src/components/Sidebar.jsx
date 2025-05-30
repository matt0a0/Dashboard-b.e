import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

const Sidebar = ({ selectedChart, onChartSelect }) => {
  const location = useLocation();

  // Esconder a sidebar de gráficos se não estiver na página principal
  const isHomePage = location.pathname === '/';

  return (
    <div className="menu-container">
      {!isHomePage && (
        <Link to="/" className="menu" style={{ marginBottom: '10px' }}>
          Voltar ao Início
        </Link>
      )}

      <UserMenu />

      {isHomePage && (
        <>
          <button className={`menu ${selectedChart === 'all' ? 'active' : ''}`} onClick={() => onChartSelect('all')}>
            Todos os Gráficos
          </button>
          <button className={`menu ${selectedChart === 'battery' ? 'active' : ''}`} onClick={() => onChartSelect('battery')}>
            Status da Bateria
          </button>
          <button className={`menu ${selectedChart === 'speed' ? 'active' : ''}`} onClick={() => onChartSelect('speed')}>
            Velocidade do Barco
          </button>
          <button className={`menu ${selectedChart === 'motorSpeed' ? 'active' : ''}`} onClick={() => onChartSelect('motorSpeed')}>
            Velocidade do Motor
          </button>
          {/* Adicione os outros botões aqui, seguindo o mesmo padrão */}
          <button className={`menu ${selectedChart === 'motorTemp' ? 'active' : ''}`} onClick={() => onChartSelect('motorTemp')}>
            Temperatura do Motor
          </button>
          <button className={`menu ${selectedChart === 'navigation' ? 'active' : ''}`} onClick={() => onChartSelect('navigation')}>
            Navegação
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;