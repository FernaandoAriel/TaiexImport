import BrandsList from "../../components/private/brand/brands-list.jsx";
import TopCarsList from "../../components/private/brand/top-cars-list.jsx";

export default function PurchasesPage() {
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6"
        style={{
          marginLeft: "20px",
          marginRight: "20px",

          marginTop: "10px",
        }}>
          <h2 className="text-xl font-medium">Gestión de Marcas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              
              marginTop: "10px",
            }}>
              <h2 className="text-xl font-medium text-red-600">Marcas</h2>
            </div>
            <BrandsList />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium text-red-600 mb-6"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              
              marginTop: "10px",
            }}>Top Carros Vendidos</h2>
            <TopCarsList />
          </div>
        </div>
      </div>
    </div>
  );
}