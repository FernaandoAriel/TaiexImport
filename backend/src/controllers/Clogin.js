import customerModel from "../models/Customers.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";


const loginController = {};

loginController.login = async (req, res) => {

    const { email, password } = req.body;

  try {

    let userFound;
    let userType;

    //1. Admin
    if (
      email === config.admin.email &&
      password === config.admin.password
    ) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
        //3. Cliente
        userFound = await customerModel.findOne({ email });
        userType = "customers";
    }

    //Si no encontramos a ningun usuario con esas credenciales
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Desencriptar contraseña
    // SOLO SI NO ES ADMIN
    if (userType !== "admin") {
      const isMatch = bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.json({ message: "Invalid password" });
      }
    }

    //// TOKEN
    //Para validar que inició sesión
    jsonwebtoken.sign(
      //1-Que voy a guardar
      { id: userFound._id, userType },
      //2-Secreto
      config.JWT.secret,
      //3-Cuando expira
      { expiresIn: config.JWT.expires },
      //4. Funcion flecha
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "Login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
  }
};

export default loginController;