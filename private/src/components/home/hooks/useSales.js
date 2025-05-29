// src/hooks/useSales.js
import { useState, useEffect } from "react";

const API = "http://localhost:4000/api/Rsales";

const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await fetch(API, {
        headers: { "Accept": "application/json" }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setSales(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching sales:", err);
      setError(err.message);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return {
    sales,
    loading,
    error,
    refreshSales: fetchSales
  };
};

export default useSales;