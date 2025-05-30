import { useState } from "react";
import { toast } from "react-hot-toast";

/*
    Campos:
        idCustomer
        order
*/

const API = "http://localhost:4000/api/Rorder";

const useDataOrder = () => {
    const [idCustomer, setIdCustomer] = useState("");
    const [order, setOrder] = useState("");
    const [editing, setEditing] = useState(false);

    const cleanData = () => {
        setIdCustomer("");
        setOrder("");
        setEditing(false);
    };

    const setOrderToEdit = (order) => {
        if (!order) {
            console.error("No se ha proporcionado una orden para editar");
            cleanData();
            return;
        }

        console.log("configurando orden para editar", order);

        setIdCustomer(order.idCustomer || "");
        setOrder(order.order || "");
        setEditing(true);
    };

    return {
        idCustomer,
        order,
        editing,
        cleanData,
        setOrderToEdit,
        setIdCustomer,
        setOrder
    };
}

export default useDataOrder;