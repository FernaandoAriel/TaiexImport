import { useState } from "react";

import { useState } from "react"
import Sidebar from "./sidebar"
import Header from "./header"
import SalesChart from "./sales-chart"
import TopBrands from "./top-brands"
import TopModels from "./top-models"
import Comments from "./comments"
import PurchasesPage from "./purchases-page"
import UsersPage from "./users-page"
import AddCarPage from "./add-car-page"
import CarsInventoryPage from "./cars-inventory-page"
import UserProfilePage from "./user-profile-page"
import EditCarPage from "./edit-car-page"
import EditUserPage from "./edit-user-page"
import SalesPage from "./sales-page"
import AddSalePage from "./add-sale-page"
import EditSalePage from "./edit-sale-page"
import EmployeesPage from "./employees-page"
import AddEmployeePage from "./add-employee-page"
import EditEmployeePage from "./edit-employee-page"
import { Plus } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("general")
  const [activePage, setActivePage] = useState("dashboard")
  const [editingCar, setEditingCar] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [editingSale, setEditingSale] = useState(null)
  const [editingEmployee, setEditingEmployee] = useState(null)

  const handleNavigation = (page) => {
    setActivePage(page)
    setEditingCar(null)
    setEditingUser(null)
    setEditingSale(null)
    setEditingEmployee(null)
  }

  const handleEditCar = (car) => {
    setEditingCar(car)
    setActivePage("edit-car")
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setActivePage("edit-user")
  }

  const handleEditSale = (sale) => {
    setEditingSale(sale)
    setActivePage("edit-sale")
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setActivePage("edit-employee")
  }

  const handleAddNew = () => {
    if (activePage === "dashboard") {
      alert("Seleccione qué desea agregar desde las secciones específicas")
    } else if (activePage === "users") {
      setActivePage("user-profile")
    } else if (activePage === "cars-inventory") {
      setActivePage("add-car")
    } else if (activePage === "sales") {
      setActivePage("add-sale")
    } else if (activePage === "employees") {
      setActivePage("add-employee")
    }
  }

  const showFloatingButton = ["dashboard", "users", "cars-inventory", "sales", "employees"].includes(activePage)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar onNavigate={handleNavigation} activePage={activePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-4">
          {activePage === "dashboard" && activeTab === "general" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-medium text-red-600 mb-4 text-center">Predicciones</h2>
                <SalesChart />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-red-600">Top Ventas</h2>
                  <button className="text-gray-500">
                    <svg
                      xmlns="http:www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </button>
                </div>
                <TopBrands />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-red-600">Comentarios</h2>
                  <span className="text-gray-500">
                    <svg
                      xmlns="http:www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                </div>
                <Comments />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-red-600">Mas Comprados</h2>
                  <span className="text-gray-500">$</span>
                </div>
                <TopModels />
              </div>
            </div>
          )}

          {activePage === "dashboard" && activeTab === "compras" && <PurchasesPage />}
          {activePage === "users" && <UsersPage onEditUser={handleEditUser} />}
          {activePage === "add-car" && <AddCarPage onBack={() => setActivePage("cars-inventory")} />}
          {activePage === "cars-inventory" && <CarsInventoryPage onEditCar={handleEditCar} />}
          {activePage === "user-profile" && <UserProfilePage onBack={() => setActivePage("users")} />}
          {activePage === "edit-car" && <EditCarPage car={editingCar} onBack={() => setActivePage("cars-inventory")} />}
          {activePage === "edit-user" && <EditUserPage user={editingUser} onBack={() => setActivePage("users")} />}

          {/* Sales Management */}
          {activePage === "sales" && <SalesPage onEditSale={handleEditSale} />}
          {activePage === "add-sale" && <AddSalePage onBack={() => setActivePage("sales")} />}
          {activePage === "edit-sale" && <EditSalePage sale={editingSale} onBack={() => setActivePage("sales")} />}

          {/* Employee Management */}
          {activePage === "employees" && <EmployeesPage onEditEmployee={handleEditEmployee} />}
          {activePage === "add-employee" && <AddEmployeePage onBack={() => setActivePage("employees")} />}
          {activePage === "edit-employee" && (
            <EditEmployeePage employee={editingEmployee} onBack={() => setActivePage("employees")} />
          )}

          {/* Floating Action Button */}
          {showFloatingButton && (
            <button
              className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
              onClick={handleAddNew}
            >
              <Plus size={24} />
            </button>
          )}
        </main>
      </div>
    </div>
  )
}
