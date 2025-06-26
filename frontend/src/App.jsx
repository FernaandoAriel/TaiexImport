import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FavoritesProvider } from "./pages/public/FavoriteContext.jsx";
import { AuthProvider, useAuth } from "./context/authContext.jsx";

// Componentes públicos
import Home from "./pages/public/home.jsx";
import Sobrenostros from "./pages/public/sobrenosotros.jsx";
import Contactanos from "./pages/public/contactanos.jsx";
import Navbar from "./components/public/navbar/navbarCliente.jsx";
import InicioSesion from "./pages/public/inicioSesion.jsx";
import BrandCatalog from "./pages/public/BrandCatalog.jsx";
import VehicleDetails from './pages/public/VehicleDetails.jsx';
import Checkout from './pages/public/Checkout.jsx';
import Footer from "./components/public/footer/footerCliente.jsx";
import Quote from './pages/public/Quote.jsx';
import Registrer from './pages/public/Registrer.jsx';

// Componentes privados
import Sidebar from "./components/private/sidebar.jsx";
import Dashboard from "./pages/private/dashboard.jsx";
import Purchases from "./pages/private/purchases-page.jsx";
import Sales from "./pages/private/sales-page.jsx";
import EditSalePage from "./components/private/sales/edit-sale-page.jsx";
import UserProfile from "./pages/private/users-page.jsx";
import EmployeesPage from "./pages/private/employees-page.jsx";
import EditEmployeePage from "./components/private/employeed/edit-employee-page.jsx";
import CreateEditUserPage from "./pages/private/create-edit-user-page.jsx";
import VehiclesPage from "./pages/private/vehicles-page.jsx";

const PrivateLayout = () => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (userType !== 'admin' && userType !== 'employee') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="sales" element={<Sales />} />
          <Route path="sales/edit/:id" element={<EditSalePage />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/edit" element={<EditEmployeePage />} />
          <Route path="employees/edit/:id" element={<EditEmployeePage />} />
          <Route path="users/create" element={<CreateEditUserPage />} />
          <Route path="users/edit" element={<CreateEditUserPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
        </Routes>
      </div>
    </div>
  );
};

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
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
          <Route path="/marcas/:brandName" element={<BrandCatalog />} />
          <Route path="/marcas/:brandName/:vehicleId" element={<VehicleDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<PublicLayout />} />
            <Route path="/admin/*" element={<PrivateLayout />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;