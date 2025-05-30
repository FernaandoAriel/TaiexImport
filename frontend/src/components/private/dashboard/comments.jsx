"use client"

import useComments from './hooks/useComments';

export default function CommentsBox() {
  const { comments, loading, error } = useComments();
  const sortedComments = [...(comments || [])].sort((a, b) => b.rating - a.rating);

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
        <div className="text-center py-4 text-lg">Cargando comentarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 flex justify-center items-center">
        <div className="text-center py-4 text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!sortedComments || sortedComments.length === 0) {
    return (
      <div className="h-96 flex justify-center items-center">
        <div className="text-center py-4 text-lg">No hay comentarios aún</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Comentarios mejor valorados</h3>
      </div>
      
      <div className="h-[500px] overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {sortedComments.map((comment) => (
            <div key={comment._id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={comment.userAvatar || "/placeholder.svg"} 
                      alt="User avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-lg font-medium text-gray-900">
                      {comment.userName || "Usuario Anónimo"}
                    </p>
                    <div className="ml-2 flex items-center">
                      <span className="text-yellow-500 text-lg font-bold mr-1">
                        {comment.rating.toFixed(1)}
                      </span>
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2 text-base">{comment.reviewText}</p>
                  
                  {comment.vehicleImage && (
                    <div className="mt-3">
                      <img
                        src={comment.vehicleImage}
                        alt="Vehículo comentado"
                        className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                  
                  <div className="mt-3 text-sm text-gray-500">
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
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-base text-gray-500">
          Mostrando {sortedComments.length} comentarios • Desplaza para ver más
        </p>
      </div>
    </div>
  );
}