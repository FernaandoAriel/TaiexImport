// src/pages/home.jsx
import React, { useMemo } from "react";
import useSales from "../../components/private/dashboard/hooks/useSales";
import useUser from "../../components/private/user/hooks/useUser";
import useComments from "../../components/private/dashboard/hooks/useComments";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const COLORS = ['#ef4444', '#f59e42', '#3b82f6', '#10b981', '#6366f1'];
const fontFamily = 'Lato, sans-serif';

function useVehicles() {
  const [vehicles, setVehicles] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:4000/api/Rvehicles")
      .then(res => res.json())
      .then(data => setVehicles(Array.isArray(data) ? data : []));
  }, []);
  return vehicles;
}

export default function Dashboard() {
  const { sales, loading: loadingSales } = useSales();
  const { users, loading: loadingUsers } = useUser();
  const { comments, loading: loadingComments } = useComments();
  const vehicles = useVehicles();

  // KPIs
  const totalVentas = sales.length;
  const totalUsuarios = users.length;
  const totalInventario = vehicles.length;
  const totalReseñas = comments.length;

  // Ventas por estado
  const ventasCompletadas = sales.filter(s => s.Estado === 'Completada').length;
  const ventasPendientes = sales.filter(s => s.Estado === 'Pendiente').length;

  // Gráfico de líneas: ventas por mes (dummy agrupado por mes de fecha de creación si existe)
  const ventasPorMes = useMemo(() => {
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const counts = Array(12).fill(0);
    sales.forEach(s => {
      const date = new Date(s.createdAt || s.fecha || Date.now());
      counts[date.getMonth()]++;
    });
    return meses.map((name, i) => ({ name, ventas: counts[i] }));
  }, [sales]);

  // Gráfico de barras: top marcas por ventas
  const topMarcas = useMemo(() => {
    const counts = {};
    sales.forEach(s => {
      const marca = s.idVehicle?.marca || 'Desconocida';
      counts[marca] = (counts[marca] || 0) + 1;
    });
    return Object.entries(counts).map(([name, ventas]) => ({ name, ventas })).sort((a,b) => b.ventas - a.ventas).slice(0,5);
  }, [sales]);

  // Pie chart: ventas completadas vs pendientes
  const pieData = [
    { name: 'Completadas', value: ventasCompletadas },
    { name: 'Pendientes', value: ventasPendientes }
  ];

  // Radar chart: datos de ejemplo
  const radarData = [
    { subject: 'Ventas', A: totalVentas, B: 100, fullMark: 150 },
    { subject: 'Usuarios', A: totalUsuarios, B: 100, fullMark: 150 },
    { subject: 'Inventario', A: totalInventario, B: 100, fullMark: 150 },
    { subject: 'Reseñas', A: totalReseñas, B: 100, fullMark: 150 },
  ];

  return (
    <div style={{ fontFamily, background: '#f8fafc', minHeight: '100vh', padding: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
        <Card title="Ventas totales" value={loadingSales ? '...' : totalVentas} accent="#ef4444" />
        <Card title="Usuarios" value={loadingUsers ? '...' : totalUsuarios} accent="#3b82f6" />
        <Card title="Inventario" value={vehicles.length === 0 ? '...' : totalInventario} accent="#10b981" />
        <Card title="Reseñas" value={loadingComments ? '...' : totalReseñas} accent="#f59e42" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Gráfico de líneas */}
        <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px #0001', padding: '24px', minHeight: 320 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#ef4444' }}>Ventas por mes</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ventasPorMes}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ventas" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Gráfico de barras */}
        <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px #0001', padding: '24px', minHeight: 320 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#3b82f6' }}>Top Marcas</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topMarcas}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Pie chart */}
        <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px #0001', padding: '24px', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#10b981' }}>Estado Ventas</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            {pieData.map((d, i) => (
              <span key={d.name} style={{ color: COLORS[i], fontWeight: 600 }}>{d.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
        {/* Radar chart */}
        <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px #0001', padding: '24px', minHeight: 320 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#6366f1' }}>Análisis General</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="A" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              <Radar name="B" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {/* Card calendario (dummy) */}
        <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px #0001', padding: '24px', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#ef4444' }}>Calendario</h3>
          <div style={{ width: '100%', textAlign: 'center', color: '#888', fontSize: 18, fontWeight: 600, padding: 32, border: '1px solid #eee', borderRadius: 12 }}>
            [Calendario aquí]
          </div>
        </div>
        {/* Card circular KPI */}
        <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px #0001', padding: '24px', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#f59e42' }}>Satisfacción</h3>
          <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'conic-gradient(#10b981 0% 90%, #eee 90% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>
            90%
          </div>
          <span style={{ color: '#888', fontWeight: 600 }}>Clientes satisfechos</span>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, accent }) {
  return (
    <div style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 2px 8px #0001', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 120 }}>
      <span style={{ color: accent, fontWeight: 700, fontSize: 18 }}>{title}</span>
      <span style={{ fontWeight: 800, fontSize: 32, marginTop: 8 }}>{value}</span>
    </div>
  );
}
