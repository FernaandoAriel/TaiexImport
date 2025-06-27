import nodemailer from "nodemailer";
import { config } from "../config.js";

const contactForm = {};

contactForm.sendContactForm = async (req, res) => {
    const { nombre, apellido, email, comentario } = req.body;

    try {
        // Debug: verificar configuración de email
        console.log("Email config:", {
            user_email: config.emailUser.user_email,
            user_pass: config.emailUser.user_pass ? "***configurado***" : "❌ NO CONFIGURADO"
        });

        // Validaciones básicas
        if (!nombre || !apellido || !email || !comentario) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Formato de email inválido" });
        }

        // Verificar que las credenciales de email estén configuradas
        if (!config.emailUser.user_email || !config.emailUser.user_pass) {
            console.error("❌ Credenciales de email no configuradas");
            return res.status(500).json({ message: "Error de configuración del servidor de email" });
        }

        // Configurar el transportador de nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass
            }
        });

        // Verificar conexión con el servidor de email
        try {
            await transporter.verify();
            console.log("✅ Conexión con Gmail exitosa");
        } catch (emailError) {
            console.error("❌ Error de conexión con Gmail:", emailError);
            return res.status(500).json({ message: "Error de conexión con el servidor de email" });
        }

        // Email de notificación para la empresa
        const mailOptionsToCompany = {
            from: config.emailUser.user_email,
            to: "rodriferar07@gmail.com", 
            subject: `📧 Nuevo mensaje de contacto - ${nombre} ${apellido}`,
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nuevo mensaje de contacto</title>
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Lato', sans-serif; background: #f8f9fa;">
                    
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(140, 26, 26, 0.1); overflow: hidden;">
                            
                            <!-- Header -->
                            <div style="background: #8C1A1A; padding: 25px 20px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 400;">
                                    Nuevo Mensaje de Contacto
                                </h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px; font-weight: 300;">
                                    Formulario de contacto del sitio web
                                </p>
                            </div>
                            
                            <!-- Contenido -->
                            <div style="padding: 25px 20px;">
                                <div style="margin-bottom: 20px;">
                                    <h3 style="color: #8C1A1A; margin: 0 0 15px; font-size: 16px; font-weight: 700;">
                                        Información del Contacto:
                                    </h3>
                                    
                                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                        <p style="margin: 0 0 8px; color: #333; font-size: 14px;">
                                            <strong>Nombre:</strong> ${nombre} ${apellido}
                                        </p>
                                        <p style="margin: 0; color: #333; font-size: 14px;">
                                            <strong>Email:</strong> ${email}
                                        </p>
                                    </div>
                                    
                                    <h3 style="color: #8C1A1A; margin: 20px 0 10px; font-size: 16px; font-weight: 700;">
                                        Mensaje:
                                    </h3>
                                    
                                    <div style="background: #fff5f5; border-left: 3px solid #e74c3c; padding: 15px; border-radius: 4px;">
                                        <p style="color: #333; margin: 0; font-size: 14px; line-height: 1.6;">
                                            ${comentario}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Footer -->
                            <div style="background: #f8f9fa; padding: 15px 20px; text-align: center; border-top: 1px solid #e9ecef;">
                                <p style="color: #666; margin: 0; font-size: 12px;">
                                    Mensaje recibido el ${new Date().toLocaleString('es-ES')}
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
NUEVO MENSAJE DE CONTACTO

Información del contacto:
- Nombre: ${nombre} ${apellido}
- Email: ${email}

Mensaje:
${comentario}

Recibido el: ${new Date().toLocaleString('es-ES')}
            `
        };

        // Email de confirmación para el usuario
        const mailOptionsToUser = {
            from: config.emailUser.user_email,
            to: email,
            subject: "✅ Hemos recibido tu mensaje - Gracias por contactarnos",
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Mensaje recibido</title>
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Lato', sans-serif; background: #f8f9fa;">
                    
                    <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
                        <div style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(140, 26, 26, 0.1); overflow: hidden;">
                            
                            <!-- Header -->
                            <div style="background: #8C1A1A; padding: 25px 20px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 400;">
                                    ¡Mensaje Recibido!
                                </h1>
                                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px; font-weight: 300;">
                                    Gracias por contactarnos
                                </p>
                            </div>
                            
                            <!-- Contenido -->
                            <div style="padding: 25px 20px; text-align: center;">
                                <p style="color: #333; margin: 0 0 15px; font-size: 15px; line-height: 1.5;">
                                    Hola <strong>${nombre}</strong>,
                                </p>
                                <p style="color: #333; margin: 0 0 20px; font-size: 15px; line-height: 1.5;">
                                    Hemos recibido tu mensaje y te responderemos lo antes posible. Nuestro equipo revisará tu consulta y se pondrá en contacto contigo.
                                </p>
                                
                                <!-- Resumen del mensaje -->
                                <div style="background: #f8f9fa; border: 2px solid #8C1A1A; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: left;">
                                    <h3 style="color: #8C1A1A; margin: 0 0 10px; font-size: 14px; font-weight: 700;">
                                        Resumen de tu mensaje:
                                    </h3>
                                    <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.4;">
                                        "${comentario.substring(0, 150)}${comentario.length > 150 ? '...' : ''}"
                                    </p>
                                </div>
                                
                                <p style="color: #666; margin: 0; font-size: 13px; line-height: 1.4;">
                                    Tiempo de respuesta estimado: <strong>24-48 horas</strong>
                                </p>
                            </div>
                            
                            <!-- Footer -->
                            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                                <p style="color: #adb5bd; margin: 0; font-size: 11px;">
                                    © ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
¡MENSAJE RECIBIDO!

Hola ${nombre},

Hemos recibido tu mensaje y te responderemos lo antes posible. 

Resumen de tu mensaje:
"${comentario}"

Tiempo de respuesta estimado: 24-48 horas

© ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
            `
        };

        // Enviar email a la empresa
        console.log("📤 Enviando email a la empresa...");
        await transporter.sendMail(mailOptionsToCompany);
        console.log("✅ Email a la empresa enviado");
        
        // Enviar email de confirmación al usuario
        console.log("📤 Enviando email de confirmación al usuario...");
        await transporter.sendMail(mailOptionsToUser);
        console.log("✅ Email de confirmación enviado");

        res.status(200).json({ 
            message: "Mensaje enviado exitosamente",
            success: true 
        });

    } catch (error) {
        console.error("❌ Error completo al enviar formulario de contacto:", error);
        res.status(500).json({ message: "Error al enviar el mensaje. Intenta nuevamente." });
    }
};

export default contactForm;