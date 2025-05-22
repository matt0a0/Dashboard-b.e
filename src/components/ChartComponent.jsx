// src/components/ChartComponent.jsx
import React from "react";

const ChartComponent = ({ data, width = 700, height = 400, title = "" }) => {
  if (!data || data.length === 0) {
    return <div style={{ width, height, border: "1px solid #ddd", padding: 20, textAlign: "center" }}>
      Selecione um indicador no menu para visualizar o gráfico.
    </div>;
  }

  // Aqui você coloca o gráfico real, por simplicidade só um placeholder
  return (
    <div style={{ width, height, border: "1px solid #ddd", padding: 20 }}>
      <h3>{title}</h3>
      {/* Exemplo simplificado: só lista os dados */}
      <ul style={{ maxHeight: height - 60, overflowY: "auto" }}>
        {data.map((item, idx) => (
          <li key={idx}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChartComponent;
