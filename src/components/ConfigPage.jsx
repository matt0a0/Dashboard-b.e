import React, { useState } from 'react';
import './ConfigPage.css'; // Importe um CSS para o estilo profissional

const ConfigPage = () => {
  const [speed, setSpeed] = useState(50); // Controlando a velocidade
  const [temperature, setTemperature] = useState(22); // Temperatura em °C
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(true); // Se a navegação está ativada
  const [theme, setTheme] = useState('light'); // Tema (claro ou escuro)

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const handleNavigationToggle = () => {
    setIsNavigationEnabled(!isNavigationEnabled);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className={`config-page ${theme}`}>
      <h2>Configurações do Sistema</h2>

      <div className="config-section">
        <label htmlFor="speed-slider">Velocidade (Km/h):</label>
        <input
          id="speed-slider"
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={handleSpeedChange}
          className="config-slider"
        />
        <span>{speed} Km/h</span>
      </div>

      <div className="config-section">
        <label htmlFor="temperature-input">Temperatura:</label>
        <input
          id="temperature-input"
          type="number"
          value={temperature}
          onChange={handleTemperatureChange}
          min="-10"
          max="50"
          className="config-input"
        />
        <span>°C</span>
      </div>

      <div className="config-section">
        <label htmlFor="navigation-toggle">Ativar Navegação:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={isNavigationEnabled}
            onChange={handleNavigationToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="config-section">
        <label htmlFor="theme-select">Tema:</label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleThemeChange}
          className="config-select"
        >
          <option value="light">Claro</option>
          <option value="dark">Escuro</option>
        </select>
      </div>
    </div>
  );
};

export default ConfigPage;
