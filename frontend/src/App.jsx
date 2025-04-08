import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx"
import Sobrenostros from "./pages/sobrenosotros.jsx"
import Contactanos from "./pages/contactanos.jsx"
import Navbar from "./components/navbar/navbarCliente.jsx"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobrenosotros" element={<Sobrenostros />} />
        <Route path="/contactanos" element={<Contactanos />} /> 
      </Routes>
    </Router>                                    
  );
}

export default App
