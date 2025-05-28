export default function Comments() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src="/placeholder.svg?height=48&width=48" alt="User avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-700">
            La Nissan Frontier es una camioneta muy espaciosa, cómoda y tiene un precio muy accesible comparado con
            otras camionetas de su categoría. ¡La recomiendo 100%!
          </p>
          <div className="mt-4 flex space-x-2">
            <img
              src="/placeholder.svg?height=60&width=100"
              alt="Nissan Frontier"
              className="w-24 h-16 object-cover rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
