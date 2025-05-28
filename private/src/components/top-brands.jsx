export default function TopBrands() {
  const brands = [
    { name: "HONDA", logo: "/placeholder.svg?height=50&width=50", sales: 300 },
    { name: "MITSUBISHI", logo: "/placeholder.svg?height=50&width=50", sales: 248 },
    { name: "TOYOTA", logo: "/placeholder.svg?height=50&width=50", sales: 234 },
  ]

  return (
    <div className="space-y-4">
      {brands.map((brand, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="max-w-full max-h-full" />
            </div>
            <span className="font-medium text-gray-800">{brand.name}</span>
          </div>
          <span className="text-gray-600">{brand.sales} Ventas</span>
        </div>
      ))}
    </div>
  )
}
