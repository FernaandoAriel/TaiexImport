import { useNavigate, useLocation } from "react-router-dom"
import { Users, Car, TrendingUp, Compass, DollarSign, Briefcase } from "lucide-react"

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path) => {
    return currentPath.startsWith(`/admin${path}`)
  }

  return (
    <div className="w-16 bg-red-500 text-white flex flex-col items-center py-6">
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
        <a
          href="#"
          className={`p-2 rounded-lg ${isActive("/dashboard") ? "bg-red-600" : "hover:bg-red-600"} transition-colors`}
          onClick={(e) => {
            e.preventDefault()
            navigate("/admin/dashboard")
          }}
        >
          <TrendingUp size={24} className="text-white" />
        </a>
        <a
          href="#"
          className={`p-2 rounded-lg ${isActive("/employees") ? "bg-red-600" : "hover:bg-red-600"} transition-colors`}
          onClick={(e) => {
            e.preventDefault()
            navigate("/admin/employees")
          }}
        >
          <Users size={24} className="text-white" />
        </a>
        <a
          href="#"
          className={`p-2 rounded-lg ${isActive("/purchases") ? "bg-red-600" : "hover:bg-red-600"} transition-colors`}
          onClick={(e) => {
            e.preventDefault()
            navigate("/admin/purchases")
          }}
        >
          <Car size={24} className="text-white" />
        </a>
        <a
          href="#"
          className={`p-2 rounded-lg ${isActive("/sales") ? "bg-red-600" : "hover:bg-red-600"} transition-colors`}
          onClick={(e) => {
            e.preventDefault()
            navigate("/admin/sales")
          }}
        >
          <DollarSign size={24} className="text-white" />
        </a>
        <a
          href="#"
          className={`p-2 rounded-lg ${isActive("/user-profile") ? "bg-red-600" : "hover:bg-red-600"} transition-colors`}
          onClick={(e) => {
            e.preventDefault()
            navigate("/admin/user-profile")
          }}
        >
          <Briefcase size={24} className="text-white" />
        </a>
      </nav>
    </div>
  )
}

export default Sidebar