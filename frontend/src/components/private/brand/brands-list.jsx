import { useState } from "react";
import useBrand from "./hooks/useBrand";
import useDataBrand from "./hooks/useDataBrand";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function BrandsList() {
  const { brand, loading, error, deleteBrand, refreshBrand } = useBrand();
  const {
    id,
    brand: editBrand,
    image: editImage,
    setBrand: setEditBrand,
    setImage: setEditImage,
    setBrandToEdit,
    handleSubmit,
    cleanData,
  } = useDataBrand();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); 

  const filteredBrands = Array.isArray(brand)
    ? brand.filter((b) =>
        b.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleCreateClick = () => {
    cleanData();
    setModalType("create");
    setShowModal(true);
  };

  const handleEditClick = (brandItem) => {
    setBrandToEdit(brandItem);
    setModalType("edit");
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    const result = await handleSubmit(e);
    if (result) {
      setShowModal(false);
      refreshBrand();
    }
  };

  if (loading) return <div className="p-4 text-center">Cargando marcas...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">

      {/* Controles superiores */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 ">
        {/* Buscador */}
        <div className="relative flex-1"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "10px",
          padding: "10px",
          paddingBottom: "10px",
          paddingTop: "10px",
          paddingLeft: "10px",
        }}>
          <input
            type="text"
            placeholder="  Buscar marca..."
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botón Agregar */}
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "10px",
            paddingRight: "10px",
          }}>
          <PlusIcon className="h-5 w-5" />
          Agregar Marca
        </button>
      </div>

      {/* Lista de marcas CON SCROLL */}
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto"
      style={{
        padding: "20px"
      }}>
        {filteredBrands.length === 0 ? (
          <div className="text-center py-8 text-gray-500"
          >
            {searchTerm
              ? "No se encontraron marcas"
              : "No hay marcas registradas"}
          </div>
        ) : (
          filteredBrands.map((brandItem) => (
            <div
              key={brandItem._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "10px",
                padding: "5px",
              }}>
              <div className="flex items-center space-x-4"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}>
                {brandItem.image && (
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded">
                    <img
                      src={brandItem.image}
                      alt={brandItem.brand}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <span className="font-medium text-gray-800">
                  {brandItem.brand}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(brandItem)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                    padding: "5px",
                  }}>
                  Editar
                </button>
                <button
                  onClick={() => deleteBrand(brandItem._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "10px",
                    padding: "5px",
                  }}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para crear/editar marca */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "edit" ? "Editar Marca" : "Agregar Nueva Marca"}
            </h2>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nombre de la marca*
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editBrand}
                  onChange={(e) => setEditBrand(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  URL de la imagen
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  placeholder="Opcional"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    cleanData();
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {modalType === "edit" ? "Guardar Cambios" : "Crear Marca"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
