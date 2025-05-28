"use client";

import { useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import useEmployeed from "../components/employeed/hooks/useEmployeed.js"; // Asegúrate de que la ruta sea correcta
import { toast } from "react-hot-toast";

const EmployeedItem = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="border-b py-4 px-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-gray-500">{employee.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Activo
          </span>
          <button
            className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => onEdit(employee)}
          >
            <Edit size={16} />
          </button>
          <button
            className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => onDelete(employee._id)}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Privilegios:</span> {employee.privilages}
        </div>
        <div>
          <span className="text-gray-500">Foto:</span> {employee.profilePicture || "No especificada"}
        </div>
      </div>
    </div>
  );
};

export default function EmployeesPage() {
  const navigate = useNavigate();
  const {
    employeed,
    loading,
    error,
    deleteEmployeed,
    selectEmployeedToEdit,
    refreshEmployeed
  } = useEmployeed();

  const handleEditEmployee = (employee) => {
    selectEmployeedToEdit(employee);
    navigate("/edit-employee");
  };

  const handleAddEmployee = () => {
    navigate("/edit-employee");
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployeed(employeeId);
      toast.success("Empleado eliminado correctamente");
      refreshEmployeed();
    } catch (error) {
      toast.error("Error al eliminar el empleado");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          <div className="flex justify-center items-center h-full">
            <p>Cargando empleados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col overflow-hidden p-6">
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Gestión de Empleados</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <button
                  onClick={handleAddEmployee}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Agregar Empleado</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            {employeed.length === 0 ? (
              <p className="text-center text-gray-500">No hay empleados registrados</p>
            ) : (
              <div className="space-y-2">
                {employeed.map((employee) => (
                  <EmployeedItem
                    key={employee._id}
                    employee={employee}
                    onEdit={handleEditEmployee}
                    onDelete={handleDeleteEmployee}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}