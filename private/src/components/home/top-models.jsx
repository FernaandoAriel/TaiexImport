export default function TopModels() {
  const models = [
    { name: "KICKS PLAY", image: "/placeholder.svg?height=60&width=120", purchases: 80 },
    { name: "SENTRA", image: "/placeholder.svg?height=60&width=120", purchases: 50 },
    { name: "PATHFINDER", image: "/placeholder.svg?height=60&width=120", purchases: 30 },
  ]

  return (
    <div className="space-y-4">
      {models.map((model, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-12">
              <img src={model.image || "/placeholder.svg"} alt={model.name} className="w-full h-full object-contain" />
            </div>
            <span className="font-medium text-gray-800">{model.name}</span>
          </div>
          <span className="text-gray-600">{model.purchases} Compras</span>
        </div>
      ))}
    </div>
  )
}
