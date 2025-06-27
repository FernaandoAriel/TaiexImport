import nodemailer from "nodemailer";
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.emailUser.user_email,
        pass: config.emailUser.user_pass
    },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"soporte EPA" <rodriferar07@gmail.com>',
            to,
            subject,
            text,
            html,
        });

        return info;
    } catch (error) {
        console.log("error" + error);
    }
};

const HTMLRecoveryEmail = (code) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Lato', Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                line-height: 1.6;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #8C1A1A 0%, #e74c3c 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            
            .header h1 {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            
            .header p {
                font-size: 16px;
                font-weight: 300;
                opacity: 0.9;
            }
            
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            
            .greeting {
                font-size: 18px;
                color: #333;
                margin-bottom: 20px;
                font-weight: 400;
            }
            
            .message {
                font-size: 16px;
                color: #666;
                margin-bottom: 30px;
                line-height: 1.8;
            }
            
            .code-container {
                background: linear-gradient(135deg, #8C1A1A 0%, #e74c3c 100%);
                border-radius: 15px;
                padding: 30px;
                margin: 30px 0;
                box-shadow: 0 6px 20px rgba(140, 26, 26, 0.2);
            }
            
            .code-label {
                color: white;
                font-size: 14px;
                font-weight: 300;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .recovery-code {
                background-color: white;
                color: #8C1A1A;
                font-family: 'Lato', monospace;
                font-size: 32px;
                font-weight: 700;
                padding: 20px;
                border-radius: 10px;
                letter-spacing: 4px;
                text-align: center;
                border: 3px solid rgba(255, 255, 255, 0.3);
                margin: 0;
                word-spacing: 8px;
            }
            
            .instructions {
                font-size: 15px;
                color: #666;
                margin: 25px 0;
                line-height: 1.7;
            }
            
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
            }
            
            .warning-icon {
                color: #8C1A1A;
                font-size: 18px;
                margin-right: 8px;
            }
            
            .warning-text {
                color: #856404;
                font-size: 14px;
                font-weight: 400;
            }
            
            .footer {
                background-color: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #eee;
            }
            
            .footer p {
                color: #666;
                font-size: 13px;
                margin-bottom: 5px;
            }
            
            .company-name {
                color: #8C1A1A;
                font-weight: 600;
            }
            
            @media (max-width: 600px) {
                .email-container {
                    margin: 10px;
                    border-radius: 0;
                }
                
                .header, .content, .footer {
                    padding: 25px 20px;
                }
                
                .recovery-code {
                    font-size: 24px;
                    letter-spacing: 2px;
                    word-spacing: 4px;
                }
                
                .header h1 {
                    font-size: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Recuperación de Contraseña</h1>
                <p>Tu código de seguridad está listo</p>
            </div>
            
            <div class="content">
                <div class="greeting">¡Hola!</div>
                
                <div class="message">
                    Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. 
                    Usa el siguiente código de recuperación para continuar con el proceso.
                </div>
                
                <div class="code-container">
                    <div class="code-label">Tu código de recuperación</div>
                    <div class="recovery-code">${code}</div>
                </div>
                
                <div class="instructions">
                    Ingresa este código en la página de recuperación de contraseña. 
                    El código es válido por <strong>15 minutos</strong> desde el momento en que fue generado.
                </div>
                
                <div class="warning">
                    <span class="warning-icon">⚠️</span>
                    <span class="warning-text">
                        Si no solicitaste este cambio, ignora este correo y tu contraseña permanecerá sin cambios.
                    </span>
                </div>
            </div>
            
            <div class="footer">
                <p>Este correo fue enviado por <span class="company-name">Soporte EPA</span></p>
                <p>Si tienes problemas, contacta nuestro soporte técnico</p>
                <p style="margin-top: 15px; font-size: 11px; color: #999;">
                    Este es un correo automático, por favor no respondas a este mensaje.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export {sendEmail, HTMLRecoveryEmail};