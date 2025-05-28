import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx"; // Asegúrate de que la ruta de importación sea correcta
import { useState } from 'react'; 

// pages
import Home from "./pages/home.jsx";
import Purchases from "./pages/purchases-page.jsx";
import Sales from "./pages/sales-page.jsx";
import Employees from "./pages/employees-page.jsx";
import EditEmployeePage from "./pages/edit-employee-page.jsx";
import EditSalePage from "./pages/edit-sale-page.jsx";
import UserProfile from "./pages/users-page.jsx"; // Cambiado a mayúscula

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavigate = (path) => {
    setActivePage(path.replace("/", "") || "dashboard");
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar onNavigate={handleNavigate} activePage={activePage} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
            <Route path="/sales/edit/:id" element={<EditSalePage />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;