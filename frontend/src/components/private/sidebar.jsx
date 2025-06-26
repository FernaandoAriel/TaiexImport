import { useNavigate, useLocation } from "react-router-dom"
import { Users, Car, TrendingUp, Compass, DollarSign, Briefcase, User } from "lucide-react"
import React from "react"
import { useAuth } from "../../context/AuthContext.jsx"

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = React.useState(false);

  const isActive = (path) => {
    return currentPath.startsWith(`/admin${path}`)
  }

  // Tooltip state
  const [hovered, setHovered] = React.useState(null)
  const navItems = [
    { path: '/dashboard', icon: TrendingUp, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Empleados' },
    { path: '/purchases', icon: Car, label: 'Marcas/Modelos' },
    { path: '/sales', icon: DollarSign, label: 'Ventas' },
    { path: '/user-profile', icon: Briefcase, label: 'Usuarios' },
    { path: '/vehicles', icon: Car, label: 'Vehículos' },
  ]

  return (
    <div className="w-16 bg-red-500 text-white flex flex-col items-center py-6" style={{ position: 'relative' }}>
      <div className="mb-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}>
          <span className="text-red-500 font-bold text-xs">TAIEX</span>
        </div>
      </div>
      <nav className="flex-1 flex flex-col items-center gap-8">
        {navItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={item.path} style={{ position: 'relative' }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
        <a
          href="#"
                className={`p-2 rounded-lg ${isActive(item.path) ? "bg-red-600" : "hover:bg-red-600"} transition-colors`}
                onClick={e => { e.preventDefault(); navigate(`/admin${item.path}`) }}
                tabIndex={0}
              >
                <Icon size={24} className="text-white" />
              </a>
              {hovered === idx && (
                <div style={{
                  position: 'absolute',
                  left: 48,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(30,30,30,0.95)',
                  color: '#fff',
                  padding: '6px 16px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px #0003',
                  zIndex: 100,
                  pointerEvents: 'none',
                }}>
                  {item.label}
                </div>
              )}
            </div>
          )
        })}
      </nav>
      {/* Perfil de usuario en la parte inferior */}
      <div style={{ marginTop: 'auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <button
          onClick={() => setProfileOpen((v) => !v)}
          style={{
            background: '#fff',
            border: 'none',
            borderRadius: 12,
            boxShadow: '0 2px 8px #0002',
            padding: 8,
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            width: 44,
            height: 44,
            justifyContent: 'center',
            transition: 'box-shadow 0.2s',
          }}
          aria-label="Perfil de usuario"
        >
          <User size={26} color="#ef4444" />
        </button>
        {profileOpen && (
          <div style={{
            position: 'absolute',
            left: 60,
            bottom: 0,
            background: '#fff',
            color: '#222',
            borderRadius: 14,
            boxShadow: '0 4px 16px #0003',
            padding: '20px 32px 20px 20px',
            minWidth: 250,
            zIndex: 200,
            fontFamily: 'Lato, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <User size={38} color="#ef4444" style={{ background: '#f8fafc', borderRadius: '50%', padding: 6 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#ef4444', marginBottom: 2 }}>{user?.nombre || 'Usuario'}</div>
                <div style={{ fontSize: 14, color: '#6366f1', fontWeight: 600 }}>{user?.tipo || 'Rol desconocido'}</div>
              </div>
            </div>
            <div style={{ fontSize: 15, color: '#222', marginTop: 2 }}>
              <span style={{ fontWeight: 600 }}>Email:</span> {user?.email || 'No disponible'}
            </div>
            {user?.fechaRegistro && (
              <div style={{ fontSize: 14, color: '#888' }}>
                <span style={{ fontWeight: 600 }}>Registrado:</span> {new Date(user.fechaRegistro).toLocaleDateString()}
              </div>
            )}
            <div style={{ fontSize: 14, color: '#888' }}>
              <span style={{ fontWeight: 600 }}>ID:</span> {user?._id || 'No disponible'}
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
            <button
              onClick={logout}
              style={{
                background: 'linear-gradient(90deg,#ef4444,#f59e42)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                borderRadius: 8,
                padding: '10px 0',
                fontSize: 16,
                cursor: 'pointer',
                marginTop: 4,
                boxShadow: '0 1px 4px #0001',
                transition: 'background 0.2s',
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar