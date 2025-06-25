import { useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEmployeed from "../../components/private/employeed/hooks/useEmployeed.js";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

const EmployeedItem = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="border-b py-4 px-4 hover:bg-gray-50 transition-colors"
      style={{
        marginRight: "30px",
        paddingLeft: "30px",
        paddingBottom: "10px",
        marginTop: "20px",
      }}>
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
    refreshEmployeed
  } = useEmployeed();
  const { user } = useAuth();
  const isEmployee = user?.privilages === 'employee' || user?.tipo === 'employee';

  const handleEditEmployee = (employee) => {
    navigate(`/admin/employees/edit/${employee._id}`, { 
      state: { employee } 
    });
  };
  
  const handleAddEmployee = () => {
    navigate("/admin/employees/edit", { 
      state: { employee: null } 
    });
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm("¿Estás seguro de eliminar este empleado?")) {
      try {
        await deleteEmployeed(employeeId);
        toast.success("Empleado eliminado correctamente");
        refreshEmployeed();
      } catch (error) {
        toast.error("Error al eliminar el empleado");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ fontFamily: 'Lato, sans-serif', background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888', fontWeight: 600 }}>Cargando empleados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ fontFamily: 'Lato, sans-serif', background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#ef4444', fontWeight: 700 }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Lato, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #0001', padding: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#ef4444', letterSpacing: 0.5, marginBottom: 32 }}>Empleados</h2>
        {!isEmployee && (
          <button
            onClick={handleAddEmployee}
            style={{ background: 'linear-gradient(90deg,#ef4444,#f59e42)', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '12px 28px', fontSize: 16, boxShadow: '0 2px 8px #0001', border: 'none', cursor: 'pointer', transition: 'background 0.2s', marginBottom: 24 }}
          >
            <Plus size={18} style={{ marginRight: 8, verticalAlign: -2 }} /> Agregar Empleado
          </button>
        )}
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <p style={{ color: '#888', fontWeight: 600 }}>Cargando empleados...</p>
          ) : error ? (
            <p style={{ color: '#ef4444', fontWeight: 700 }}>Error: {error}</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
              <thead>
                <tr style={{ background: '#f3f4f6' }}>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#ef4444', fontWeight: 700 }}>Nombre</th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#ef4444', fontWeight: 700 }}>Correo</th>
                  <th style={{ textAlign: 'left', padding: '16px 12px', color: '#ef4444', fontWeight: 700 }}>Privilegios</th>
                  {!isEmployee && <th style={{ textAlign: 'left', padding: '16px 12px', color: '#ef4444', fontWeight: 700 }}>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {employeed.map((employee, idx) => (
                  <tr key={employee._id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb', transition: 'background 0.2s' }}>
                    <td style={{ padding: '14px 12px', fontWeight: 600 }}>{employee.firstName} {employee.lastName}</td>
                    <td style={{ padding: '14px 12px' }}>{employee.email}</td>
                    <td style={{ padding: '14px 12px' }}>{employee.privilages}</td>
                    {!isEmployee && (
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={{ background: '#3b82f6', color: '#fff', borderRadius: 8, padding: '6px 12px', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleEditEmployee(employee)}>
                            <Edit size={16} />
                          </button>
                          <button style={{ background: '#ef4444', color: '#fff', borderRadius: 8, padding: '6px 12px', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleDeleteEmployee(employee._id)}>
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}