import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const API = "http://localhost:4000/api/Rorder";

const useOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderToEdit, setOrderToEdit] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch(API, { headers: { Accept: "application/json" } });
            if (!response.ok) {
                throw new Error("Error al obtener las órdenes");
            }

            const text = await response.text();
            if (text.startsWith("<!DOCTYPE html>")) {
                throw new Error("Error de servidor al obtener las órdenes");
            }

            const data = JSON.parse(text);
            setOrders(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchOrders();
    }, []);

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Error al eliminar la orden");
            }

            setOrders(orders.filter(order => order._id !== id));
            toast.success("Orden eliminada correctamente");
        } catch (err) {
            console.error("Error deleting order:", err);
            toast.error("Error al eliminar la orden");
        }
    }
    const selectOrderToEdit = (order) => {
        setOrderToEdit(order);
    };
    const refreshOrders = () => {
        fetchOrders();
    };

    return {
        orders,
        loading,
        error,
        deleteOrder,
        selectOrderToEdit,
        refreshOrders,
        orderToEdit
    };
}

export default useOrder;