import { useState } from "react";
import { toast } from "react-hot-toast";

const useDataSales = () => {
    const [id, setId] = useState(null);
    const [idVehicle, setIdVehicle] = useState("");
    const [idCustomer, setIdCustomer] = useState("");
    const [Estado, setEstado] = useState("");
    const [editing, setEditing] = useState(false);

    const cleanData = () => {
        setId(null);
        setIdVehicle("");
        setIdCustomer("");
        setEstado("");
        setEditing(false);
    }

    const setSaleToEdit = (sale) => {
        if (!sale) {
            console.error("No se ha proporcionado una venta para editar");
            cleanData();
            return;
        }

        console.log("Datos de venta recibidos para edición:", sale);

        setId(sale._id || "");
        setIdVehicle(sale.idVehicle?._id || sale.idVehicle || sale.id_carros?._id || sale.id_carros || "");
        setIdCustomer(sale.idCustomer?._id || sale.idCustomer || sale.id_clientes?._id || sale.id_clientes || "");
        setEstado(sale.Estado || sale.estado || "");
        setEditing(true);
    };

    return {
        id,
        idVehicle,
        idCustomer,
        Estado,
        editing,
        cleanData,
        setSaleToEdit
    };
}

export default useDataSales;