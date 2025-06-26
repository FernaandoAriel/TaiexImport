import BrandsList from "../../components/private/brand/brands-list.jsx";
import TopCarsList from "../../components/private/brand/top-cars-list.jsx";

export default function PurchasesPage() {
  return (
    <div style={{ fontFamily: 'Lato, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#ef4444', letterSpacing: 0.5 }}>Gestión de Marcas</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #0001', padding: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#ef4444', marginBottom: 24 }}>Marcas</h2>
            <BrandsList />
          </div>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #0001', padding: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#3b82f6', marginBottom: 24 }}>Top Carros Vendidos</h2>
            <TopCarsList />
          </div>
        </div>
      </div>
    </div>
  );
}