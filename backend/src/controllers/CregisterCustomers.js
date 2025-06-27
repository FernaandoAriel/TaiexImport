import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import customersModel from "../models/Customers.js";
import { config } from "../config.js";

const registerCustomersController = {};

registerCustomersController.register = async (req, res) => {
    const { name, lastName, email, password } = req.body;

    try {
        const exitsCustomer = await customersModel.findOne({ email });
        if (exitsCustomer) {
            return res.json({ message: "Customer already exists" });
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newCustomer = new customersModel({
            name, lastName, email, password: passwordHash
        });

        await newCustomer.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            { email, verificationCode },
            config.JWT.secret,
            { expiresIn: "2h" }
        )

        res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass
            }
        });

         const mailOptions = {
            from: config.emailUser.user_email,
            to: email,
            subject: "🔐 Verificación de cuenta - Código de confirmación",
            html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verificación de cuenta</title>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Lato', sans-serif; background: #f8f9fa; min-height: 100vh;">
            
            <!-- Container principal -->
            <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
                
                <!-- Card principal -->
                <div style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(140, 26, 26, 0.1); overflow: hidden;">
                    
                    <!-- Header -->
                    <div style="background: #8C1A1A; padding: 25px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 400; font-family: 'Lato', sans-serif;">
                            Verificación de Cuenta
                        </h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px; font-weight: 300;">
                            Confirma tu dirección de correo electrónico
                        </p>
                    </div>
                    
                    <!-- Contenido principal -->
                    <div style="padding: 25px 20px;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <p style="color: #333; margin: 0; font-size: 15px; line-height: 1.5; font-weight: 400;">
                                Para completar tu registro y verificar tu cuenta, utiliza el siguiente código de verificación:
                            </p>
                        </div>
                        
                        <!-- Código de verificación -->
                        <div style="background: #f8f9fa; border: 2px solid #8C1A1A; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                            <div style="color: #8C1A1A; font-size: 28px; font-weight: 700; letter-spacing: 4px; margin: 0; font-family: 'Lato', sans-serif;">
                                ${verificationCode.toUpperCase()}
                            </div>
                            <p style="color: #666; margin: 8px 0 0; font-size: 12px; font-weight: 300;">
                                Código de verificación
                            </p>
                        </div>
                        
                        <!-- Información adicional -->
                        <div style="background: #fff5f5; border-left: 3px solid #e74c3c; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <h3 style="color: #8C1A1A; margin: 0 0 8px; font-size: 14px; font-weight: 700;">
                                Información importante
                            </h3>
                            <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.4; font-weight: 300;">
                                • Este código expira en <strong>2 horas</strong><br>
                                • Solo puede ser utilizado una vez<br>
                                • Es sensible a mayúsculas y minúsculas
                            </p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                        <p style="color: #666; margin: 0 0 8px; font-size: 13px; font-weight: 400;">
                            ¿No solicitaste esta verificación?
                        </p>
                        <p style="color: #999; margin: 0; font-size: 12px; line-height: 1.4; font-weight: 300;">
                            Si no creaste una cuenta, puedes ignorar este correo de forma segura.
                        </p>
                        
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
                            <p style="color: #adb5bd; margin: 0; font-size: 11px; font-weight: 300;">
                                © ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `,
            text: `
🔐 VERIFICACIÓN DE CUENTA

Para completar tu registro y verificar tu cuenta, utiliza el siguiente código de verificación:

CÓDIGO: ${verificationCode.toUpperCase()}

⏰ INFORMACIÓN IMPORTANTE:
• Este código expira en 2 horas
• Solo puede ser utilizado una vez
• Es sensible a mayúsculas y minúsculas

¿No solicitaste esta verificación?
Si no creaste una cuenta, puedes ignorar este correo de forma segura.

© ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
    `
        }


         transporter.sendMail(mailOptions, (error, info) =>{
            if(error) console.log("error" + error);
            res.json({message: "Email sent" + info});
        });


        res.json({ message: "Customer registered, please verify your email" });
    } catch (error) {
        console.log("error" + error);
        res.json({ message: "Error" + error });
    }
};

registerCustomersController.verifyCodeEmail = async (req, res) => {
    const { verificationCodeRequest } = req.body;

    try {
        // Verificar que se envió el código
        if (!verificationCodeRequest) {
            return res.status(400).json({ message: "Código de verificación requerido" });
        }

        // Verificar que existe el token
        const token = req.cookies.verificationToken;
        if (!token) {
            return res.status(400).json({ message: "No hay sesión de verificación activa" });
        }

        // Verificar y decodificar el token
        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, config.JWT.secret);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({ message: "El código de verificación ha expirado" });
            }
            return res.status(400).json({ message: "Token de verificación inválido" });
        }

        const { email, verificationCode: storedCode } = decoded;

        // Comparar códigos (convertir ambos a mayúsculas para la comparación)
        if (verificationCodeRequest.toUpperCase() !== storedCode.toUpperCase()) {
            return res.status(400).json({ message: "Código incorrecto. Verifica e intenta nuevamente." });
        }

        // Buscar el usuario en la base de datos
        const customer = await customersModel.findOne({ email });
        if (!customer) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar si ya está verificado
        if (customer.isVerified) {
            return res.status(400).json({ message: "La cuenta ya está verificada" });
        }

        // Verificar la cuenta
        customer.isVerified = true;
        await customer.save();

        // Limpiar la cookie de verificación
        res.clearCookie("verificationToken");

        // Respuesta exitosa
        return res.status(200).json({ 
            message: "Email verified successfully",
            success: true 
        });

    } catch (error) {
        console.log("Error en verifyCodeEmail:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

//ENDPOINT PARA REENVIAR EL CODIGO

registerCustomersController.resendVerificationCode = async (req, res) => {
    try {
        // Obtener el token de verificación de las cookies
        const token = req.cookies.verificationToken;
        
        if (!token) {
            return res.status(400).json({ message: "No hay sesión de verificación activa" });
        }

        // Verificar y decodificar el token
        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, config.JWT.secret);
        } catch (error) {
            // Si el token expiró, permitir reenvío con nuevo token
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({ message: "La sesión de verificación ha expirado. Por favor, regístrate nuevamente." });
            }
            return res.status(400).json({ message: "Token de verificación inválido" });
        }

        const { email } = decoded;

        // Verificar que el usuario existe y no está verificado
        const existingCustomer = await customersModel.findOne({ email });
        if (!existingCustomer) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (existingCustomer.isVerified) {
            return res.status(400).json({ message: "La cuenta ya está verificada" });
        }

        // Generar nuevo código de verificación
        const newVerificationCode = crypto.randomBytes(3).toString("hex");

        // Crear nuevo token con el nuevo código
        const newTokenCode = jsonwebtoken.sign(
            { email, verificationCode: newVerificationCode },
            config.JWT.secret,
            { expiresIn: "2h" }
        );

        // Actualizar la cookie con el nuevo token
        res.cookie("verificationToken", newTokenCode, { 
            maxAge: 2 * 60 * 60 * 1000, // 2 horas
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        // Configurar el transportador de nodemailer
        const transporter = nodemailer.createTransporter({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass
            }
        });

        // Configurar las opciones del correo con el template HTML
        const mailOptions = {
            from: config.emailUser.user_email,
            to: email,
            subject: "🔐 Nuevo código de verificación - Código de confirmación",
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Verificación de cuenta</title>
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Lato', sans-serif; background: #f8f9fa; min-height: 100vh;">
                    
                    <!-- Container principal -->
                    <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
                        
                        <!-- Card principal -->
                        <div style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(140, 26, 26, 0.1); overflow: hidden;">
                            
                            <!-- Header -->
                            <div style="background: #8C1A1A; padding: 25px 20px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 400; font-family: 'Lato', sans-serif;">
                                    Nuevo Código de Verificación
                                </h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px; font-weight: 300;">
                                    Reenvío solicitado - Confirma tu dirección de correo
                                </p>
                            </div>
                            
                            <!-- Contenido principal -->
                            <div style="padding: 25px 20px;">
                                <div style="text-align: center; margin-bottom: 20px;">
                                    <p style="color: #333; margin: 0; font-size: 15px; line-height: 1.5; font-weight: 400;">
                                        Has solicitado un nuevo código de verificación. Utiliza el siguiente código para completar tu registro:
                                    </p>
                                </div>
                                
                                <!-- Código de verificación -->
                                <div style="background: #f8f9fa; border: 2px solid #8C1A1A; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                                    <div style="color: #8C1A1A; font-size: 28px; font-weight: 700; letter-spacing: 4px; margin: 0; font-family: 'Lato', sans-serif;">
                                        ${newVerificationCode.toUpperCase()}
                                    </div>
                                    <p style="color: #666; margin: 8px 0 0; font-size: 12px; font-weight: 300;">
                                        Nuevo código de verificación
                                    </p>
                                </div>
                                
                                <!-- Información adicional -->
                                <div style="background: #fff5f5; border-left: 3px solid #e74c3c; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                    <h3 style="color: #8C1A1A; margin: 0 0 8px; font-size: 14px; font-weight: 700;">
                                        Información importante
                                    </h3>
                                    <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.4; font-weight: 300;">
                                        • Este nuevo código expira en <strong>2 horas</strong><br>
                                        • El código anterior ya no es válido<br>
                                        • Solo puede ser utilizado una vez<br>
                                        • Es sensible a mayúsculas y minúsculas
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Footer -->
                            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                                <p style="color: #666; margin: 0 0 8px; font-size: 13px; font-weight: 400;">
                                    ¿No solicitaste este reenvío?
                                </p>
                                <p style="color: #999; margin: 0; font-size: 12px; line-height: 1.4; font-weight: 300;">
                                    Si no solicitaste un nuevo código, puedes ignorar este correo de forma segura.
                                </p>
                                
                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
                                    <p style="color: #adb5bd; margin: 0; font-size: 11px; font-weight: 300;">
                                        © ${new Date().getFullYear()} TaiexImport. Todos los derechos reservados.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
🔐 NUEVO CÓDIGO DE VERIFICACIÓN

Has solicitado un nuevo código de verificación.

CÓDIGO: ${newVerificationCode.toUpperCase()}

⏰ INFORMACIÓN IMPORTANTE:
• Este nuevo código expira en 2 horas
• El código anterior ya no es válido
• Solo puede ser utilizado una vez
• Es sensible a mayúsculas y minúsculas

¿No solicitaste este reenvío?
Si no solicitaste un nuevo código, puedes ignorar este correo de forma segura.

© ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
            `
        };

        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error al enviar correo:", error);
                return res.status(500).json({ message: "Error al enviar el correo de verificación" });
            }
            
            console.log("Correo de reenvío enviado:", info.response);
            res.json({ 
                message: "Nuevo código de verificación enviado exitosamente",
                info: "Revisa tu correo electrónico"
            });
        });

    } catch (error) {
        console.log("Error en resendVerificationCode:", error);
        res.status(500).json({ message: "Error interno del servidor: " + error.message });
    }
};

export default registerCustomersController;