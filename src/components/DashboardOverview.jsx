// src/components/DashboardOverview.jsx
import React, { useState } from "react";
import ChartComponent from "./ChartComponent";

const DashboardOverview = () => {
  // Aqui você pode trazer os dados reais, por enquanto vou simular:
  const batteryData = [
    { time: "08:00", battery: 90 },
    { time: "08:05", battery: 88 },
    { time: "08:10", battery: 87 },
  ];

  const speedData = [
    { time: "08:00", speed: 10 },
    { time: "08:05", speed: 12 },
    { time: "08:10", speed: 15 },
  ];

  // Estado para controlar qual indicador está selecionado (opcional)
  const [selectedIndicator, setSelectedIndicator] = useState("battery");

  // Função que retorna dados e título conforme indicador selecionado
  const getChartData = () => {
    switch (selectedIndicator) {
      case "battery":
        return { data: batteryData, title: "Status da Bateria" };
      case "speed":
        return { data: speedData, title: "Velocidade do Barco (km/h)" };
      default:
        return { data: [], title: "" };
    }
  };

  const { data, title } = getChartData();

  return (
    <div>
      <h2>Dashboard Overview</h2>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setSelectedIndicator("battery")}>Bateria</button>
        <button onClick={() => setSelectedIndicator("speed")}>Velocidade</button>
      </div>

      <ChartComponent data={data} title={title} />
    </div>
  );
};

export default DashboardOverview;
