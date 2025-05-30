import React, { createContext, useContext, useState, useEffect } from "react";

const SERVER_URL = "http://localhost:4000/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCookie, setAuthCookie] = useState(null);
  const [userType, setUserType] = useState(null);

  const isAuthenticated = () => {
    return !!authCookie;
  };

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
      localStorage.setItem("userType", data.userType);
      setAuthCookie(data.token);
      setUser(data.user);
      setUserType(data.userType);

      return { 
        success: true, 
        message: data.message,
        userType: data.userType
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setAuthCookie(null);
    setUser(null);
    setUserType(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");
    const savedUserType = localStorage.getItem("userType");
    
    if (token) {
      setAuthCookie(token);
      
      // Manejo seguro del parseo de usuario
      try {
        if (savedUser && savedUser !== "undefined") {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
      
      if (savedUserType) {
        setUserType(savedUserType);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        logout, 
        authCookie, 
        setAuthCookie,
        userType,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);