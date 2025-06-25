// src/pages/sales-page.jsx
"use client"

import SalesTable from "../../components/private/sales/sales.jsx"

export default function SalesPage() {
 return (
    <div style={{ fontFamily: 'Lato, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #0001', padding: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#ef4444', letterSpacing: 0.5, marginBottom: 32 }}>Ventas</h2>
        <SalesTable/>
      </div>
    </div>
  )
}