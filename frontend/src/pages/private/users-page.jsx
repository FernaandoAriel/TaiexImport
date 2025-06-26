// src/pages/users-page.jsx
"use client"

import { useEffect, useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";
import useCustomer from "../../components/private/user/hooks/useCustomer";
import { useNavigate } from "react-router-dom";

const API_SALES_BY_CUSTOMER = "http://localhost:4000/api/Rsales/customer/";

export default function UsersPage() {
  const { customers, loading, error, refreshCustomers, deleteCustomer } = useCustomer();
  const navigate = useNavigate();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sales, setSales] = useState([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [errorSales, setErrorSales] = useState(null);

  // Toast helpers
  const showToast = (msg, type = "success") => {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = type === "success" ? "#22c55e" : "#ef4444";
    toast.style.color = "white";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = 9999;
    toast.style.fontWeight = "bold";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleAddUser = () => {
    navigate("/admin/users/create");
  };

  const handleEditUser = (user) => {
    navigate("/admin/users/edit", { state: { user } });
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${user.firstName} ${user.lastName}?`)) {
      try {
        await deleteCustomer(user._id);
        showToast("Usuario eliminado correctamente", "success");
      } catch (err) {
        showToast("Error al eliminar usuario", "error");
      }
    }
  };

  // Modal logic
  const handleOpenModal = async (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setLoadingSales(true);
    setErrorSales(null);
    setSales([]);
    try {
      const res = await fetch(API_SALES_BY_CUSTOMER + user._id);
      if (!res.ok) throw new Error("Error al obtener ventas del usuario");
      const data = await res.json();
      setSales(data);
    } catch (err) {
      setErrorSales(err.message);
    } finally {
      setLoadingSales(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSales([]);
    setErrorSales(null);
  };

  return (
    <div style={{ fontFamily: 'Lato, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#ef4444', letterSpacing: 0.5 }}>Usuarios</h2>
          <button
            onClick={handleAddUser}
            style={{ background: 'linear-gradient(90deg,#ef4444,#f59e42)', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '12px 28px', fontSize: 16, boxShadow: '0 2px 8px #0001', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            <Plus size={18} style={{ marginRight: 8, verticalAlign: -2 }} /> Agregar Usuario
          </button>
        </div>
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #0001', padding: 32 }}>
          <div style={{ overflowX: 'auto' }}>
            {loading ? (
              <p style={{ color: '#888', fontWeight: 600 }}>Cargando usuarios...</p>
            ) : error ? (
              <p style={{ color: '#ef4444', fontWeight: 700 }}>Error: {error}</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
                <thead>
                  <tr style={{ background: '#f3f4f6' }}>
                    <th style={{ textAlign: 'left', padding: '16px 12px', color: '#ef4444', fontWeight: 700 }}>Nombre Completo</th>
                    <th style={{ textAlign: 'left', padding: '16px 12px', color: '#ef4444', fontWeight: 700 }}>Correo Electrónico</th>
                    <th style={{ textAlign: 'left', padding: '16px 12px', color: '#ef4444', fontWeight: 700 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, idx) => (
                    <tr key={customer._id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => handleOpenModal(customer)}>
                      <td style={{ padding: '14px 12px', fontWeight: 600 }}>{customer.firstName} {customer.lastName}</td>
                      <td style={{ padding: '14px 12px' }}>{customer.email}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
                          <button style={{ background: '#3b82f6', color: '#fff', borderRadius: 8, padding: '6px 12px', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleEditUser(customer)}>
                            <Edit size={16} />
                          </button>
                          <button style={{ background: '#ef4444', color: '#fff', borderRadius: 8, padding: '6px 12px', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleDeleteUser(customer)}>
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* Modal de ventas asociadas al usuario */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.25)' }}>
          <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px #0002', width: '100%', maxWidth: 700, border: '1px solid #eee', animation: 'fade-in 0.2s' }}>
            {/* Cabecera */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderTopLeftRadius: 24, borderTopRightRadius: 24, background: 'linear-gradient(90deg,#ef4444,#f59e42)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4Z" fill="#fff"/></svg>
                Ventas de {selectedUser?.firstName} {selectedUser?.lastName}
              </h3>
              <button onClick={handleCloseModal} style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', color: '#ef4444', fontSize: 28, border: '1px solid #f3f4f6', boxShadow: '0 2px 8px #0001', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                &times;
              </button>
            </div>
            {/* Contenido */}
            <div style={{ padding: 32 }}>
              {loadingSales ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                  <div style={{ borderRadius: '50%', border: '4px solid #ef4444', borderTop: '4px solid #fff', width: 40, height: 40, animation: 'spin 1s linear infinite', marginBottom: 12 }}></div>
                  <span style={{ color: '#888', fontWeight: 600 }}>Cargando ventas...</span>
                </div>
              ) : errorSales ? (
                <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 700 }}>{errorSales}</p>
              ) : sales.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32 }}>
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" fill="#e5e7eb"/></svg>
                  <p style={{ color: '#888', marginTop: 12, fontWeight: 600 }}>No hay ventas asociadas a este usuario.</p>
                </div>
              ) : (
                <table style={{ width: '100%', fontSize: 15, borderCollapse: 'collapse', marginTop: 8, boxShadow: '0 2px 8px #0001', borderRadius: 12, overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: '#f3f4f6', color: '#ef4444' }}>
                      <th style={{ padding: '12px 8px', fontWeight: 700 }}>Vehículo</th>
                      <th style={{ padding: '12px 8px', fontWeight: 700 }}>Año</th>
                      <th style={{ padding: '12px 8px', fontWeight: 700 }}>Precio</th>
                      <th style={{ padding: '12px 8px', fontWeight: 700 }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale, idx) => (
                      <tr key={sale._id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb' }}>
                        <td style={{ padding: '10px 8px' }}>{sale.idVehicle?.marca} {sale.idVehicle?.modelo}</td>
                        <td style={{ padding: '10px 8px' }}>{sale.idVehicle?.year}</td>
                        <td style={{ padding: '10px 8px', fontWeight: 700, color: '#10b981' }}>${sale.idVehicle?.price}</td>
                        <td style={{ padding: '10px 8px' }}>
                          <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, fontWeight: 700, fontSize: 13, background: sale.Estado === 'Completada' ? '#dcfce7' : sale.Estado === 'Pendiente' ? '#fef9c3' : '#f3f4f6', color: sale.Estado === 'Completada' ? '#16a34a' : sale.Estado === 'Pendiente' ? '#ca8a04' : '#888' }}>{sale.Estado}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: '#f3f4f6' }}>
                      <td colSpan={2} style={{ textAlign: 'right', fontWeight: 700, padding: '10px 8px' }}>Total ventas:</td>
                      <td colSpan={2} style={{ fontWeight: 800, color: '#ef4444', padding: '10px 8px' }}>{sales.length}</td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}