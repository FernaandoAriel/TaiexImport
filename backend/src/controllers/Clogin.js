import customerModel from "../models/Customers.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import userModel from "../models/User.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound;
    let userType;

    // 1. Verificar si es admin
    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { 
        _id: "admin",
        email: config.admin.email,
        name: "Administrador"
      };
    } else {
      // 2. Buscar como cliente
      userFound = await customerModel.findOne({ email });
      userType = "customers";
      // 3. Si no es cliente, buscar como empleado
      if (!userFound) {
        userFound = await userModel.findOne({ email });
        userType = "employee";
      }
    }

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña (excepto para admin)
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    }

    // Crear token JWT
    jsonwebtoken.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) {
          console.error("Error al generar token:", error);
          return res.status(500).json({ message: "Error interno del servidor" });
        }
        
        // Datos de respuesta según tipo
        let nombre = userFound.name || userFound.firstName || userFound.email?.split('@')[0];
        let tipo = userType;
        if (userType === 'employee') {
          tipo = userFound.privilages || 'employee';
        }
        res.json({ 
          message: "Inicio de sesión exitoso",
          token,
          user: {
            _id: userFound._id,
            email: userFound.email,
            nombre,
            tipo,
            fechaRegistro: userFound.createdAt
          },
          userType
        });
      }
    );
  } catch (error) {
    console.error("Error en loginController:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default loginController;