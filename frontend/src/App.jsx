import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx"
import Sobrenostros from "./pages/sobrenosotros.jsx"
import Contactanos from "./pages/contactanos.jsx"
import Navbar from "./components/navbar/navbarCliente.jsx"
import InicioSesion from "./pages/inicioSesion.jsx"
import Marcas from "./pages/Marcas.jsx"
import Footer from "./components/footer/footerCliente.jsx"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobrenosotros" element={<Sobrenostros />} />
        <Route path="/contactanos" element={<Contactanos />} /> 
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/marcas" element={<Marcas />} />
      </Routes>
      <Footer/>
    </Router>                                    
  );
}

export default App
