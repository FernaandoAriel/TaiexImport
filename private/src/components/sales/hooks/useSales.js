import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const API_BASE = 'http://localhost:4000/api/Rsales';

const useSales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saleToEdit, setSaleToEdit] = useState(null);

    const normalizeSaleData = (sale) => {
      // Normalizar la estructura del vehículo
      const vehicle = sale.idVehicle || sale.id_carros || {};
      
      return {
          ...sale,
          idVehicle: {
              _id: vehicle._id,
              marca: vehicle.marca,
              modelo: vehicle.modelo,
              precio: vehicle.precio,
              year: vehicle.year,
              price: vehicle.price
          },
          idCustomer: sale.idCustomer || sale.id_clientes,
          Estado: sale.Estado || sale.estado
      };
  };

    const fetchSales = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_BASE);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!Array.isArray(data)) {
                throw new Error("Formato de datos inválido recibido del servidor");
            }
            
            // Normaliza los datos antes de guardarlos
            const normalizedSales = data.map(normalizeSaleData);
            setSales(normalizedSales);
            
            console.log("Ventas cargadas y normalizadas:", normalizedSales);
        } catch (err) {
            console.error("Error en fetchSales:", err);
            setError(err.message);
            toast.error(`Error al cargar ventas: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const deleteSale = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/${id}`, { 
                method: 'DELETE' 
            });
            
            if (!response.ok) {
                throw new Error('Error al eliminar la venta');
            }

            setSales(prevSales => prevSales.filter(sale => sale._id !== id));
            toast.success('Venta eliminada correctamente');
        } catch (err) {
            console.error('Error deleting sale:', err);
            toast.error('Error al eliminar la venta');
        }
    };

    const selectSaleToEdit = (sale) => {
        // Normaliza los datos antes de pasarlos
        setSaleToEdit(normalizeSaleData(sale));
    };

    const refreshSales = () => {
        fetchSales();
    };

    return {
        sales,
        loading,
        error,
        saleToEdit,
        fetchSales,
        deleteSale,
        selectSaleToEdit,
        refreshSales
    };
};

export default useSales;