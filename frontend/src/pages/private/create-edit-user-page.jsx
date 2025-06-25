import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const API = "http://localhost:4000/api/Ruser";

export default function CreateEditUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || null;
  const isEdit = Boolean(user);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
    privilages: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        profilePicture: user.profilePicture || "",
        privilages: user.privilages || "user",
      });
    }
  }, [user]);

  // Toast helpers
  const showToast = (msg, type = "success") => {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = type === "success" ? "#22c55e" : "#ef4444";
    toast.style.color = "white";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = 9999;
    toast.style.fontWeight = "bold";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "admin" : "user") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${API}/${user._id}` : API;
      const body = { ...userData };
      if (!body.password) delete body.password; // No enviar password vacío en edición
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Error al guardar usuario");
      setSuccess("Usuario guardado correctamente");
      showToast("Usuario guardado correctamente", "success");
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      setError(err.message);
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Imagen de perfil: usa un placeholder local si la URL no es válida
  const getProfileImage = () => {
    if (!userData.profilePicture || userData.profilePicture.startsWith("http") === false) {
      return "/vite.svg"; // Usa un SVG local de tu public/
    }
    return userData.profilePicture;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-medium">{isEdit ? "Editar Usuario" : "Crear Usuario"}</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombres
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña {isEdit && <span className="text-xs text-gray-400">(dejar en blanco para no cambiar)</span>}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder={isEdit ? "Dejar en blanco para mantener la actual" : ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required={!isEdit}
            />
          </div>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
              Foto de Perfil (URL)
            </label>
            <input
              id="profilePicture"
              type="text"
              name="profilePicture"
              value={userData.profilePicture}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <input
              id="privilages"
              type="checkbox"
              name="privilages"
              checked={userData.privilages === "admin"}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label htmlFor="privilages" className="text-sm font-medium text-gray-700">
              Privilegios de Administrador
            </label>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
            <img
              src={getProfileImage()}
              alt="User profile"
              className="w-full h-full object-cover"
              onError={e => { e.target.onerror = null; e.target.src = "/vite.svg"; }}
            />
          </div>
        </div>
      </form>
    </div>
  );
} 