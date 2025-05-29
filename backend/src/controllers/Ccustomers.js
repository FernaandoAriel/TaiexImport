import bcryptjs from "bcryptjs";
import customersModel from "../models/Customers.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import { v2 as cloudinary } from "cloudinary";

const customersController = {};

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

// SELECT
customersController.getcustomers = async (req, res) => {
    const customers = await customersModel.find();
    res.json(customers);
};

// INSERT (registro con hash de contraseña, subida de imagen y token)
customersController.createcustomers = async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate } = req.body;

        // Verificar si el cliente ya existe
        const existingCustomer = await customersModel.findOne({ email });
        if (existingCustomer) {
            return res.json({ message: "Customer already exists" });
        }

        // Validar que password exista
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Subir la imagen a Cloudinary si existe archivo
        let imageURL = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path, {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
            );
            imageURL = result.secure_url;
        }

        // Hashear la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        // Crear nuevo cliente
        const newCustomer = new customersModel({
            firstName,
            lastName,
            email,
            password: passwordHash,
            profilePicture: imageURL,
            birthDate
        });

        await newCustomer.save();

        // Generar token
        jsonwebtoken.sign(
            { id: newCustomer._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expires },
            (error, token) => {
                if (error) {
                    console.error("JWT Error:", error); // <-- Esto te mostrará el error real
                    return res.status(500).json({ message: "Token error" });
                }
                res.cookie("authToken", token);
                res.json({ message: "customer saved" });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "error: " + error });
    }
};

// DELETE
customersController.deletecustomers = async (req, res) => {
    const deletedcustomers = await customersModel.findByIdAndDelete(req.params.id);
    if (!deletedcustomers) {
        return res.status(404).json({ message: "customer not found" });
    }
    res.json({ message: "customer deleted" });
};

// UPDATE
customersController.updatecustomers = async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate } = req.body;

        // Solo agrega campos que realmente vienen en el body
        let updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (birthDate !== undefined) updateData.birthDate = birthDate;

        // Si hay nueva imagen, súbela a Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path, {
                    folder: "public",
                    allowed_formats: ["png", "jpg", "jpeg"]
                }
            );
            updateData.profilePicture = result.secure_url;
        } else if (req.body.profilePicture) {
            updateData.profilePicture = req.body.profilePicture;
        }

        if (password) {
            updateData.password = await bcryptjs.hash(password, 10);
        }

        const updatedCustomer = await customersModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: "customer not found" });
        }

        res.json({ message: "customer updated", customer: updatedCustomer });
    } catch (error) {
        res.status(500).json({ message: "error: " + error });
    }
};
export default customersController; 