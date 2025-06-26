import VehicleCard from '../CardMarcas.jsx';
import "../Catalogo/css/vehicle.css"

const VehicleGrid = ({ vehicles, brandName }) => (
  <div className="vehicle-grid">
    {vehicles.map(car => (
      <VehicleCard key={car._id} car={car} brandName={brandName} />
    ))}
  </div>
);

export default VehicleGrid;