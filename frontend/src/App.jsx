// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./pages/FavoriteContext.jsx"; // Ajusta la ruta según tu estructura de archivos
import Home from "./pages/home.jsx";
import Sobrenostros from "./pages/sobrenosotros.jsx";
import Contactanos from "./pages/contactanos.jsx";
import Navbar from "./components/navbar/navbarCliente.jsx";
import InicioSesion from "./pages/inicioSesion.jsx";
import BrandCatalog from "./pages/BrandCatalog.jsx";
import VehicleDetails from './pages/VehicleDetails.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobrenosotros" element={<Sobrenostros />} />
          <Route path="/contactanos" element={<Contactanos />} /> 
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/marcas/:brandName" element={<BrandCatalog />} />
          <Route path="/marcas/:brandName/:vehicleId" element={<VehicleDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;