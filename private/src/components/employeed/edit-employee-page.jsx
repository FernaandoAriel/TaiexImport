"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditEmployeePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;

  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    startDate: "",
    salary: "",
    status: "",
    notes: "",
  });

  // Initialize form with employee data when component mounts or employee changes
  useEffect(() => {
    if (employee) {
      // Split the full name into first and last name
      const nameParts = employee.name ? employee.name.split(" ") : ["", ""];
      const firstName = nameParts.slice(0, 2).join(" ");
      const lastName = nameParts.slice(2).join(" ");

      // Format date from DD/MM/YYYY to YYYY-MM-DD for input type="date"
      const dateParts = employee.startDate
        ? employee.startDate.split("/")
        : ["", "", ""];
      const formattedDate =
        dateParts.length === 3
          ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
          : "";

      setEmployeeData({
        firstName,
        lastName,
        position: employee.position || "",
        department: employee.department || "",
        email: employee.email || "",
        phone: employee.phone || "",
        startDate: formattedDate,
        salary: employee.salary || "",
        status: employee.status || "Activo",
        notes: employee.notes || "",
      });
    } else {
      // Reset form for new employee
      setEmployeeData({
        firstName: "",
        lastName: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        startDate: "",
        salary: "",
        status: "Activo",
        notes: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated employee data:", employeeData);
    // Here you would typically send the data to your backend
    handleBack();
  };

  const handleBack = () => {
    navigate("/employees"); // Navegar de vuelta a la página de empleados
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
            {employee ? "Editar Empleado" : "Agregar Empleado"}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form
            onSubmit={handleSubmit}
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
                  value={employeeData.firstName}
                  onChange={handleChange}
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
                  value={employeeData.lastName}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Cargo
                </label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  value={employeeData.position}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Departamento
                </label>
                <select
                  id="department"
                  name="department"
                  value={employeeData.department}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                >
                  <option value="">Seleccionar departamento</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Administración">Administración</option>
                  <option value="Servicio Técnico">Servicio Técnico</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                </select>
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
                  value={employeeData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={employeeData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Fecha de Inicio
                </label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={employeeData.startDate}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="salary"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Salario
                </label>
                <input
                  id="salary"
                  type="text"
                  name="salary"
                  value={employeeData.salary}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  value={employeeData.status}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Vacaciones">Vacaciones</option>
                  <option value="Permiso">Permiso</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Notas
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={employeeData.notes}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                ></textarea>
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full px-8 py-4 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-3 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {employee ? "Guardar Cambios" : "Agregar Empleado"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

