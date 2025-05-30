// src/pages/users-page.jsx
"use client"

import { Edit, Trash } from "lucide-react"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Jonathan Arturo Valle Sanchez",
      email: "vallesanchez77@gmail.com",
      phone: "8018-5678",
      hasPrivileges: true,
    },
    {
      id: 2,
      name: "Kevin Josue Arce Hernandez",
      email: "kevin.hernandez@gmail.com",
      phone: "9041-8578",
      hasPrivileges: false,
    },
  ]

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <h2 className="text-xl font-medium mb-6"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          
          marginTop: "10px",
        }}>Perfil de Usuario</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="overflow-x-auto"
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            
            marginTop: "10px",
          }}>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-red-600 font-medium">Nombre Completo</th>
                  <th className="text-left py-3 px-4 text-red-600 font-medium">Correo Electronico</th>
                  <th className="text-left py-3 px-4 text-red-600 font-medium">Número de Teléfono</th>
                  <th className="text-left py-3 px-4 text-red-600 font-medium">Privilegios</th>
                  <th className="text-left py-3 px-4 text-red-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={user.hasPrivileges}
                          readOnly
                          className="h-4 w-4 text-red-600 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-full bg-black text-white">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 rounded-full bg-black text-white">
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
  )
}