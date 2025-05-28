"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useDataEmployeed from "./hooks/useDataEmployeed.js"; // Asegúrate de que la ruta sea correcta

export default function EditEmployeePage() {
  const location = useLocation();
  const navigate = useNavigate();
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
    setEmployeedToEdit
  } = useDataEmployeed();

  // Solo inicializa el formulario una vez cuando el componente se monta
  useEffect(() => {
    if (employeeToEdit) {
      setEmployeedToEdit(employeeToEdit);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setProfilePicture("");
      setPrivilages("");
    }
  }, []); // 👈 ejecuta una sola vez al montar

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      toast.success(editing ? "Empleado actualizado correctamente" : "Empleado creado correctamente");
      navigate("/employees");
    } catch (error) {
      toast.error("Error al procesar la solicitud");
    }
  };

  const handleBack = () => {
    navigate("/employees");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={handleBack}
            className="p-3 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold text-gray-900">
            {editing ? "Editar Empleado" : "Agregar Empleado"}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Nombres
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Apellidos
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required={!editing}
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
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
                />
              </div>
              <div>
                <label
                  htmlFor="privilages"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Privilegios
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
              <div className="pt-6">
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
