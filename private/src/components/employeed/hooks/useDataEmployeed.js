import { useState } from "react";
import { toast } from "react-hot-toast";

/*
    Campos:
       firstName
       lastName
       email
       password
       profilePicture
       privilages
*/


const API = "http://localhost:4000/api/Ruser";

const useDataEmployeed = () => {
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [privilages, setPrivilages] = useState("");
    const [editing, setEditing] = useState(false);


    const cleanData = () => {
        setId("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setProfilePicture("");
        setPrivilages("");
        setEditing(false);
    };

    const setEmployeedToEdit = (employeed) => {
        if (!employeed) {
            console.error("No se ha proporcionado un empleado para editar");
            cleanData();
            return;
        }

        console.log("configurando empleado para editar", employeed);


        setId(employeed._id || "");
        setFirstName(employeed.firstName || "");
        setLastName(employeed.lastName || "");
        setEmail(employeed.email || "");
        setPassword(employeed.password || "");
        setProfilePicture(employeed.profilePicture || "");
        setPrivilages(employeed.privilages || "");
        setEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeedData = {
            firstName,
            lastName,
            email,
            password,
            profilePicture,
            privilages
        };

        try{
            let response;
            if(editing){
                response = await fetch(`${API}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeedData)
                });

                if(!response.ok) throw new Error("Error al actualizar el empleado");
                toast.success("Empleado actualizado correctamente");
            }
            else {
                response = await fetch(API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeedData)
                });

                if(!response.ok) throw new Error("Error al crear el empleado");
                toast.success("Empleado creado correctamente");
            }
            cleanData();
        }
        catch (error) {
            console.error("Error al enviar los datos del empleado:", error);
            toast.error("Error al enviar los datos del empleado");
        }
    };

    return {
        id,
        setId,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        profilePicture,
        setProfilePicture,
        privilages,
        setPrivilages,
        editing,
        setEditing,
        handleSubmit,
        cleanData,
        setEmployeedToEdit
    };
};

export default useDataEmployeed;