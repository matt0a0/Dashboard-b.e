import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu'; // Certifique-se que este componente existe

const Sidebar = ({ selectedChart, onChartSelect }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Defina os botões de gráfico aqui para facilitar a manutenção
  const chartButtons = [
    { id: 'all', label: 'Todos os Gráficos' },
    { id: 'battery', label: 'Status da Bateria' },
    { id: 'speed', label: 'Velocidade do Barco' },
    { id: 'motorSpeed', label: 'Velocidade do Motor' },
    { id: 'motorTemp', label: 'Temperatura do Motor' },
    { id: 'controlTemp', label: 'Temperatura do Controle' },
    { id: 'windSpeed', label: 'Velocidade do Vento' }, // Supondo que você tenha este
    { id: 'waves', label: 'Corrente/Ondas' }, // Supondo que você tenha este
    { id: 'navigation', label: 'Navegação (Bússola)' },
  ];

  return (
    <div className="menu-container"> {/* Use a classe do seu App.css */}
      {!isHomePage && (
        <Link to="/" className="menu menu-button-base" style={{ marginBottom: '10px' }}>
          Voltar ao Início
        </Link>
      )}

      <UserMenu />

      {isHomePage && (
        <>
          {chartButtons.map(button => (
            <button 
              key={button.id}
              // Use a classe base e adicione 'active' condicionalmente
              className={`menu menu-button-base ${selectedChart === button.id ? 'active' : ''}`} 
              onClick={() => onChartSelect(button.id)}
            >
              {button.label}
            </button>
          ))}
        </>
      )}
       {/* Links para outras páginas podem vir aqui se não estiverem no Header */}
       <hr style={{borderColor: 'var(--border-color)', margin: '10px 0'}}/>
       <Link to="/historico" className="menu menu-button-base">Histórico</Link>
       <Link to="/configuracao" className="menu menu-button-base">Configuração</Link>
    </div>
  );
};

export default Sidebar;
