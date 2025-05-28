import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
const SERVER_URL = "http://localhost:4000/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCookie, setAuthCookie] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthCookie(data.token);
      setUser(data.user);

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    // Si luego agregas logout en backend, puedes mantener el fetch aqui
    // En logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthCookie(null);
    setUser(null);
  };

  // En useEffect
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");
    if (token) {
      setAuthCookie(token);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, authCookie, setAuthCookie }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
