import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/weather';

export function useWeatherHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    axios.get(API_BASE_URL)
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          setHistory(currentHistory => {
            const newHistory = res.data.slice(-100);
            if (JSON.stringify(currentHistory) === JSON.stringify(newHistory)) return currentHistory;
            return newHistory;
          });
          if (error) setError(null);
        }
      })
      .catch(() => setError("Não foi possível conectar à API."))
      .finally(() => {
        setLoading(false);
      });
  }, [error]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Atualiza a cada 1 minuto
    return () => clearInterval(interval);
  }, [fetchData]);

  console.log("Teste");
  return { history, loading, error };
}
