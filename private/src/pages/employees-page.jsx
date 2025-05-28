"use client"

import { useState } from "react"
import { Edit, Trash, FileText, Plus, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function EmployeesPage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const employees = [
    {
      id: 1,
      name: "Jonathan Arturo Valle Sanchez",
      position: "Vendedor Senior",
      department: "Ventas",
      email: "vallesanchez77@gmail.com",
      phone: "8018-5678",
      startDate: "15/01/2020",
      status: "Activo",
      salary: "1500.00",
      notes: "Empleado ejemplar"
    },
    {
      id: 2,
      name: "Kevin Josue Arce Hernandez",
      position: "Vendedor Junior",
      department: "Ventas",
      email: "kevin.hernandez@gmail.com",
      phone: "9041-8578",
      startDate: "10/03/2021",
      status: "Activo",
      salary: "1200.00",
      notes: "En periodo de prueba"
    },
    {
      id: 3,
      name: "María Fernanda López",
      position: "Gerente de Ventas",
      department: "Administración",
      email: "maria.lopez@gmail.com",
      phone: "7022-4567",
      startDate: "05/06/2018",
      status: "Activo",
      salary: "2500.00",
      notes: "A cargo del departamento"
    },
    {
      id: 4,
      name: "Carlos Eduardo Ramírez",
      position: "Mecánico",
      department: "Servicio Técnico",
      email: "carlos.ramirez@gmail.com",
      phone: "8532-9874",
      startDate: "20/08/2019",
      status: "Activo",
      salary: "1800.00",
      notes: "Especialista en motores"
    },
    {
      id: 5,
      name: "Ana Patricia Mendoza",
      position: "Recepcionista",
      department: "Administración",
      email: "ana.mendoza@gmail.com",
      phone: "9087-6543",
      startDate: "12/11/2022",
      status: "Activo",
      salary: "1300.00",
      notes: "Atención al cliente"
    },
  ]

  const handleEditEmployee = (employee) => {
    navigate(`/employees/edit/${employee.id}`, { state: { employee } })
  }

  const handleAddEmployee = () => {
    navigate("/employees/add", { state: { employee: null } })
  }

  const handleDeleteEmployee = (employeeId) => {
    // Lógica para eliminar empleado
    console.log("Eliminar empleado con ID:", employeeId)
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Gestión de Empleados</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Plus size={16} />
                  <span>Empleado</span>
                  <ChevronDown size={16} />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleAddEmployee()
                          setIsMenuOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Agregar Empleado
                      </button>
                      <button
                        onClick={() => {
                          if (employees.length > 0) {
                            handleEditEmployee(employees[0])
                            setIsMenuOpen(false)
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Editar Empleado
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                <FileText size={16} />
                <span>Reporte</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Nombre</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Cargo</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Departamento</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Teléfono</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Fecha de Inicio</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Estado</th>
                    <th className="text-left py-3 px-4 text-red-600 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="py-3 px-4">{employee.name}</td>
                      <td className="py-3 px-4">{employee.position}</td>
                      <td className="py-3 px-4">{employee.department}</td>
                      <td className="py-3 px-4">{employee.email}</td>
                      <td className="py-3 px-4">{employee.phone}</td>
                      <td className="py-3 px-4">{employee.startDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {employee.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            className="p-1 rounded-full bg-black text-white" 
                            onClick={() => handleEditEmployee(employee)}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="p-1 rounded-full bg-black text-white"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}