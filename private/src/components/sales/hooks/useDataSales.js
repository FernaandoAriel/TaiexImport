import { useState } from "react";
import { toast } from "react-hot-toast";

/*
    Campos:
    id_carros
    id_clientes
    Estado
*/

const API = "http://localhost:4000/api/Rsales";

const useDataSales = () => {
    const [id, setId] = useState(null);
    const [id_carros, setIdCarros] = useState("");
    const [id_clientes, setIdClientes] = useState("");
    const [estado, setEstado] = useState("");
    const [editing, setEditing] = useState(false);

    const cleanData = () => {
        setId(null);
        setIdCarros("");
        setIdClientes("");
        setEstado("");
        setEditing(false);
    }

    const setSaleToEdit = (sale) => {
        if (!sale) {
            console.error("No se ha proporcionado una venta para editar");
            cleanData();
            return;
        }

        console.log("configurando venta para editar", sale);

        setId(sale._id || "");
        setIdCarros(sale.id_carros || "");
        setIdClientes(sale.id_clientes || "");
        setEstado(sale.estado || "");
        setEditing(true);

    };

    return {
        id,
        id_carros,
        id_clientes,
        estado,
        editing,
        cleanData,
        setSaleToEdit
    };

}
export default useDataSales;