export default function TopCarsList() {
  const cars = [
    { name: "KICKS PLAY", image: "/placeholder.svg?height=60&width=120", purchases: 80 },
    { name: "SENTRA", image: "/placeholder.svg?height=60&width=120", purchases: 50 },
    { name: "PATHFINDER", image: "/placeholder.svg?height=60&width=120", purchases: 30 },
    { name: "FRONTIER", image: "/placeholder.svg?height=60&width=120", purchases: 27 },
    { name: "FRONTIER C/S", image: "/placeholder.svg?height=60&width=120", purchases: 18 },
    { name: "URVAN", image: "/placeholder.svg?height=60&width=120", purchases: 9 },
  ]

  return (
    <div className="space-y-6">
      {cars.map((car, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-12">
              <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-contain" />
            </div>
            <span className="font-medium text-gray-800">{car.name}</span>
          </div>
          <span className="text-gray-600">{car.purchases} Compras</span>
        </div>
      ))}
    </div>
  )
}
