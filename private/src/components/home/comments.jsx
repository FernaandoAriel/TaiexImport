import useComments from './hooks/useComments'; // Ajusta la ruta según tu estructura

export default function CommentsBox() {
  const { comments, loading, error } = useComments();

  // Ordenar comentarios por rating (de mayor a menor)
  const sortedComments = [...(comments || [])].sort((a, b) => b.rating - a.rating);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center py-4">Cargando comentarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center py-4 text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!sortedComments || sortedComments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center py-4">No hay comentarios aún</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Comentarios mejor valorados</h3>
      </div>
      
      <div className="h-96 overflow-y-auto"> {/* Altura fija con scroll */}
        <div className="divide-y divide-gray-200">
          {sortedComments.map((comment) => (
            <div key={comment._id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={comment.userAvatar || "/placeholder.svg?height=40&width=40"} 
                      alt="User avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {comment.userName || "Usuario Anónimo"}
                    </p>
                    <div className="ml-2 flex items-center">
                      <span className="text-yellow-400 text-sm font-bold mr-1">
                        {comment.rating.toFixed(1)}
                      </span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{comment.reviewText}</p>
                  
                  {comment.vehicleImage && (
                    <div className="mt-2">
                      <img
                        src={comment.vehicleImage}
                        alt="Vehículo comentado"
                        className="w-20 h-14 object-cover rounded border border-gray-200"
                      />
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-sm text-gray-500">
        {sortedComments.length} comentarios • Desplaza para ver más
      </div>
    </div>
  );
}