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
import Footer from "./components/footer/footerCliente.jsx"
import Quote from './pages/Quote.jsx';
import Registrer from './pages/Registrer.jsx';
import { AuthProvider } from "./context/authContext.jsx";


function App() {
  return (
    <AuthProvider>
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobrenosotros" element={<Sobrenostros />} />
          <Route path="/contactanos" element={<Contactanos />} /> 
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/register" element={<Registrer />} />
          <Route path="/marcas/:brandName" element={<BrandCatalog />} />
          <Route path="/marcas/:brandName/:vehicleId" element={<VehicleDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cotizar" element={<Quote />} />
        </Routes>
        <Footer/>
      </Router>
    </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;