import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useDataEmployeed from "./hooks/useDataEmployeed.js";

export default function EditEmployeePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const employeeToEdit = location.state?.employee;

  const {
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
    handleSubmit,
    setEmployeedToEdit,
    loadEmployeeById
  } = useDataEmployeed();

  // Cargar datos del empleado al montar el componente
  useEffect(() => {
    if (employeeToEdit) {
      setEmployeedToEdit(employeeToEdit);
    } else if (id) {
      loadEmployeeById(id);
    } else {
      // Resetear campos para nuevo empleado
      resetForm();
    }
  }, [id, employeeToEdit]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setProfilePicture("");
    setPrivilages("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!firstName || !lastName || !email || (!editing && !password)) {
      toast.error("Por favor complete todos los campos requeridos");
      return;
    }

    try {
      await handleSubmit(e);
      toast.success(
        editing ? "Empleado actualizado correctamente" : "Empleado creado correctamente"
      );
      navigate("/admin/employees");
    } catch (error) {
      toast.error(error.message || "Error al procesar la solicitud");
      console.error("Error en handleFormSubmit:", error);
    }
  };

  const handleBack = () => {
    navigate("/admin/employees");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Encabezado */}
        <div className="flex items-center space-x-4 mb-8"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "40px",
          marginTop: "10px",
        }}>
          <button
            onClick={handleBack}
            className="p-3 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Volver atrás"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold text-gray-900">
            {editing ? "Editar Empleado" : "Agregar Nuevo Empleado"}
          </h2>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8 "style={{
          width: "50rem",
          margin: "0 auto",
          padding: "2rem",
          marginLeft: "10rem",

        }}>
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-6">
              {/* Nombre */}
              <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "10px",
              }}>
                <label
                  htmlFor="firstName"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Nombres *
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                  placeholder="Ingrese los nombres"
                />
              </div>

              {/* Apellido */}
              <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                
                marginTop: "10px",
              }}>
                <label
                  htmlFor="lastName"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Apellidos *
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                  placeholder="Ingrese los apellidos"
                />
              </div>

              {/* Email */}
              <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                
                marginTop: "10px",
              }}v>
                <label
                  htmlFor="email"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Correo Electrónico *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                  placeholder="ejemplo@correo.com"
                />
              </div>

              {/* Contraseña */}
              <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                
                marginTop: "10px",
              }}>
                <label
                  htmlFor="password"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Contraseña {!editing && '*'}
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required={!editing}
                  placeholder={editing ? "Dejar en blanco para no cambiar" : "Ingrese contraseña"}
                />
                {editing && (
                  <p className="text-sm text-gray-500 mt-1">
                    Dejar en blanco para mantener la contraseña actual
                  </p>
                )}
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              {/* Foto de perfil */}
              <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                
                marginTop: "10px",
              }}>
                <label
                  htmlFor="profilePicture"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  URL de Foto de Perfil
                </label>
                <input
                  id="profilePicture"
                  type="text"
                  name="profilePicture"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="https://ejemplo.com/foto.jpg"
                />
                {profilePicture && (
                  <div className="mt-2">
                    <img 
                      src={profilePicture} 
                      alt="Vista previa" 
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Privilegios */}
              <div
              style={{
                marginLeft: "15px",
                marginRight: "15px",
                marginTop: "10px",
              }}>
                <label
                  htmlFor="privilages"
                  className="block text-base font-semibold text-gray-700 mb-2"
                  style={{
                    padding: "10px 25px",
                  }}>
                  Privilegios *
                </label>
                <select
                  id="privilages"
                  name="privilages"
                  value={privilages}
                  onChange={(e) => setPrivilages(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                >
                  <option value="">Seleccionar privilegios</option>
                  <option value="admin">Administrador</option>
                  <option value="manager">Gerente</option>
                  <option value="employee">Empleado</option>
                  <option value="viewer">Solo lectura</option>
                </select>
              </div>

              {/* Botón de submit */}
              <div className="pt-6"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                
                marginTop: "30px",
              }}>
                <button
                  type="submit"
                  className="w-full px-8 py-4 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-3 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {editing ? "Guardar Cambios" : "Agregar Empleado"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}