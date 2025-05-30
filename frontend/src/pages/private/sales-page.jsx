// src/pages/sales-page.jsx
"use client"

import SalesTable from "../../components/private/sales/sales.jsx"

export default function SalesPage() {
 return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <SalesTable/>
      </div>
    </div>
  )
}