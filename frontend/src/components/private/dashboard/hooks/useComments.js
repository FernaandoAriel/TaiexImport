import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const API = 'http://localhost:4000/api/Rreviews';

const useComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentToEdit, setCommentToEdit] = useState(null);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await fetch(API, { headers: { Accept: 'application/json' } });
            if (!response.ok) {
                throw new Error('Error al obtener los comentarios');
            }

            const text = await response.text();
            if (text.startsWith('<!DOCTYPE html>')) {
                throw new Error('Error de servidor al obtener los comentarios');
            }

            const data = JSON.parse(text);
            setComments(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchComments();
    }, []);

    const deleteComment = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Error al eliminar el comentario');
            }

            setComments(comments.filter(comment => comment._id !== id));
            toast.success('Comentario eliminado correctamente');
        } catch (err) {
            console.error('Error deleting comment:', err);
            toast.error('Error al eliminar el comentario');
        }
    }

    const selectCommentToEdit = (comment) => {
        setCommentToEdit(comment);
    };

    const refreshComments = () => {
        fetchComments();
    };

    return {
        comments,
        loading,
        error,
        commentToEdit,
        setCommentToEdit,
        fetchComments,
        deleteComment,
        selectCommentToEdit,
        refreshComments
    };
}
export default useComments;