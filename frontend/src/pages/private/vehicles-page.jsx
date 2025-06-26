import { useState, useEffect } from "react";
import AddCarPage from "../../components/private/add-car-page.jsx";
import EditCarPage from "./edit-car-page.jsx";

const API_URL = "http://localhost:4000/api/Rvehicles";

function fetchVehicles() {
  return fetch(API_URL).then((res) => res.json());
}

function createVehicle(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

function updateVehicle(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

function deleteVehicle(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [search, setSearch] = useState("");

  const loadVehicles = () => {
    setLoading(true);
    fetchVehicles()
      .then((data) => {
        setVehicles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar vehículos");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleAdd = (data) => {
    createVehicle(data).then(() => {
      setShowAdd(false);
      loadVehicles();
    });
  };

  const handleEdit = (id, data) => {
    updateVehicle(id, data).then(() => {
      setEditCar(null);
      loadVehicles();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este vehículo?")) {
      deleteVehicle(id).then(() => loadVehicles());
    }
  };

  const filtered = vehicles.filter((v) =>
    v.idModel?.model?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Lato, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#ef4444', letterSpacing: 0.5 }}>Vehículos</h2>
          <button
            style={{ background: 'linear-gradient(90deg,#10b981,#3b82f6)', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '12px 28px', fontSize: 16, boxShadow: '0 2px 8px #0001', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
            onClick={() => setShowAdd(true)}
          >
            Agregar Vehículo
          </button>
        </div>
        <input
          type="text"
          placeholder="Buscar por modelo..."
          style={{ marginBottom: 24, padding: '10px 18px', border: '1px solid #e5e7eb', borderRadius: 10, width: 320, fontSize: 16, outline: 'none', boxShadow: '0 1px 4px #0001' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #0001', padding: 32 }}>
          {loading ? (
            <div style={{ color: '#888', fontWeight: 600 }}>Cargando vehículos...</div>
          ) : error ? (
            <div style={{ color: '#ef4444', fontWeight: 700 }}>{error}</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
                <thead>
                  <tr style={{ background: '#f3f4f6' }}>
                    <th style={{ textAlign: 'left', padding: '16px 12px', color: '#10b981', fontWeight: 700 }}>Modelo</th>
                    <th style={{ textAlign: 'left', padding: '16px 12px', color: '#10b981', fontWeight: 700 }}>Año</th>
                    <th style={{ textAlign: 'left', padding: '16px 12px', color: '#10b981', fontWeight: 700 }}>Precio</th>
                    <th style={{ textAlign: 'left', padding: '16px 12px', color: '#10b981', fontWeight: 700 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: 24, color: '#888', fontWeight: 600 }}>No hay vehículos</td>
                    </tr>
                  ) : (
                    filtered.map((car, idx) => (
                      <tr key={car._id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb', transition: 'background 0.2s' }}>
                        <td style={{ padding: '14px 12px', fontWeight: 600 }}>{car.idModel?.model}</td>
                        <td style={{ padding: '14px 12px' }}>{car.year}</td>
                        <td style={{ padding: '14px 12px', color: '#3b82f6', fontWeight: 700 }}>${car.price}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button style={{ background: '#3b82f6', color: '#fff', borderRadius: 8, padding: '6px 12px', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => setEditCar(car)}>
                              Editar
                            </button>
                            <button style={{ background: '#ef4444', color: '#fff', borderRadius: 8, padding: '6px 12px', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleDelete(car._id)}>
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', width: '100%', maxWidth: 600, padding: 32 }}>
            <AddCarPage
              onBack={() => setShowAdd(false)}
              onSubmit={handleAdd}
            />
          </div>
        </div>
      )}
      {editCar && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', width: '100%', maxWidth: 600, padding: 32 }}>
            <EditCarPage
              car={editCar}
              onBack={() => setEditCar(null)}
              onSubmit={(data) => handleEdit(editCar._id, data)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
