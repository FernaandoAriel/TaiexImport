"use client"

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-white border-b border-gray-200 flex justify-between items-center px-6 py-4 "
    style={{
      paddingRight: "10px",
      paddingLeft: "10px",
      paddingBottom: "10px",
      marginTop: "10px",
    }}>
      <div className="flex space-x-8" >
        <button
          className={`text-2x1 py-2 px-1 border-b-2 transition-colors  ${
            activeTab === "general" 
              ? "text-red-600 font-semibold border-red-600" 
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("general")}
          style={{
            marginRight: "30px"
          }}
        >
          Descripción General
        </button>
        
        <button
          className={`text-2x1 py-2 px-1 border-b-2 transition-colors ${
            activeTab === "compras" 
              ? "text-red-600 font-semibold border-red-600" 
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("compras")}
        >
          Compras
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-2x1 text-gray-700" style={{
            marginRight: "30px"
          }}>Kevin Josue</span>
        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
          <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  )
}