import React from 'react';
import MapComponent from './MapComponent';
import AllCharts from './AllCharts';
import ChartView from './ChartView';

const DashboardPage = ({ history, latestData, selectedChart, loading, error }) => {
  if (loading) return <div className="content-placeholder">A carregar dashboard...</div>;
  if (error) return <div className="content-placeholder" style={{color: 'red'}}>{error}</div>;
  if (!latestData) return <div className="content-placeholder">A aguardar dados do servidor...</div>;
  
  if (selectedChart === 'all') {
    return <AllCharts history={history} latestData={latestData} loading={loading} />;
  }

  return (
    <>
      <div className="map-view-container">
        <MapComponent latitude={latestData?.Latitude} longitude={latestData?.Longitude} />
      </div>
      <div className="chart-view-container">
        <ChartView selectedChart={selectedChart} history={history} latestData={latestData} loading={loading} />
      </div>
    </>
  );
};
export default DashboardPage;
