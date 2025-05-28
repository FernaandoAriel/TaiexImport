"use client"

import { Edit, Trash } from "lucide-react"

export default function CarsInventoryPage({ onEditCar }) {
  const carBrands = [
    { name: "NISSAN", logo: "/placeholder.svg?height=40&width=40" },
    { name: "HONDA", logo: "/placeholder.svg?height=40&width=40" },
    { name: "TOYOTA", logo: "/placeholder.svg?height=40&width=40" },
    { name: "KIA", logo: "/placeholder.svg?height=40&width=40" },
    { name: "LEXUS", logo: "/placeholder.svg?height=40&width=40" },
    { name: "HYUNDAI", logo: "/placeholder.svg?height=40&width=40" },
    { name: "MAZDA", logo: "/placeholder.svg?height=40&width=40" },
    { name: "SUZUKI", logo: "/placeholder.svg?height=40&width=40" },
    { name: "MITSUBISHI", logo: "/placeholder.svg?height=40&width=40" },
    { name: "SUBARU", logo: "/placeholder.svg?height=40&width=40" },
  ]

  const carModels = [
    {
      id: 1,
      name: "QASHQAI",
      image: "/placeholder.svg?height=100&width=200",
      year: "2023",
      price: "$32,000",
      details: "SUV compacto con excelente rendimiento",
      equipment: "Cámara 360, asientos de cuero, techo panorámico",
      compatibleKits: "Kit deportivo, kit off-road",
      discount: "5%",
    },
    {
      id: 2,
      name: "PATHFINDER",
      image: "/placeholder.svg?height=100&width=200",
      year: "2023",
      price: "$45,000",
      details: "SUV familiar con gran capacidad",
      equipment: '7 asientos, pantalla táctil 12", sistema de sonido premium',
      compatibleKits: "Kit aventura, kit familiar",
      discount: "3%",
    },
    {
      id: 3,
      name: "X-TRAIL",
      image: "/placeholder.svg?height=100&width=200",
      year: "2023",
      price: "$38,500",
      details: "SUV versátil para ciudad y aventura",
      equipment: "Tracción 4x4, asistente de conducción, sistema de navegación",
      compatibleKits: "Kit todoterreno, kit urbano",
      discount: "7%",
    },
    {
      id: 4,
      name: "KICKS PLAY",
      image: "/placeholder.svg?height=100&width=200",
      year: "2023",
      price: "$25,800",
      details: "Crossover juvenil con tecnología avanzada",
      equipment: 'Sistema de audio Bose, pantalla táctil 10", cámara de reversa',
      compatibleKits: "Kit tecnológico, kit deportivo",
      discount: "10%",
    },
    {
      id: 5,
      name: "KICKS",
      image: "/placeholder.svg?height=100&width=200",
      year: "2023",
      price: "$23,500",
      details: "Crossover compacto y eficiente",
      equipment: 'Pantalla táctil 8", cámara de reversa, bluetooth',
      compatibleKits: "Kit básico, kit urbano",
      discount: "5%",
    },
    {
      id: 6,
      name: "SENTRA",
      image: "/placeholder.svg?height=100&width=200",
      year: "2023",
      price: "$27,900",
      details: "Sedán elegante y confortable",
      equipment: "Asientos de cuero, sistema de sonido premium, climatizador",
      compatibleKits: "Kit ejecutivo, kit deportivo",
      discount: "8%",
    },
  ]

  return (
    <div className="flex">
      {/* Brands sidebar */}
      <div className="w-1/4 border-r pr-4 space-y-6">
        {carBrands.map((brand, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="max-w-full max-h-full" />
            </div>
            <span className="text-sm font-medium">{brand.name}</span>
          </div>
        ))}
      </div>

      {/* Car models grid */}
      <div className="w-3/4 pl-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carModels.map((car) => (
            <div key={car.id} className="flex flex-col items-center">
              <div className="w-full h-32 mb-2 overflow-hidden">
                <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-center font-medium mb-2">{car.name}</h3>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-black text-white" onClick={() => onEditCar(car)}>
                  <Edit size={16} />
                </button>
                <button className="p-2 rounded-full bg-black text-white">
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
