import { useState} from "react";
import { toast } from "react-hot-toast";

/*
    Campos:
        idCustomer
        reviewText
        rating
        idVehicle
*/

const API = "http://localhost:4000/api/Rreviews";

const useDataComments = () => {
    const [id, setId] = useState(null);
    const [idCustomer, setIdCustomer] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("");
    const [idVehicle, setIdVehicle] = useState("");
    const [editing, setEditing] = useState(false);

    const cleanData = () => {
        setId(null);
        setIdCustomer("");
        setReviewText("");
        setRating("");
        setIdVehicle("");
        setEditing(false);
    };

    const setCommentToEdit = (comment) => {
        if (!comment) {
            console.error("No se ha proporcionado un comentario para editar");
            cleanData();
            return;
        }

        console.log("configurando comentario para editar", comment);

        setId(comment._id || "");
        setIdCustomer(comment.idCustomer || "");
        setReviewText(comment.reviewText || "");
        setRating(comment.rating || "");
        setIdVehicle(comment.idVehicle || "");
        setEditing(true);
    };

    return {
        id,
        idCustomer,
        reviewText,
        rating,
        idVehicle,
        editing,
        cleanData,
        setCommentToEdit
    };
}

export default useDataComments;