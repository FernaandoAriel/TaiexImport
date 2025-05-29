// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser from "cookie-parser";
import brandRoutes from "./src/routes/Rbrand.js";
import customersRoutes from "./src/routes/Rcustomers.js";
import likedRoutes from "./src/routes/Rliked.js";
import modelsRoutes from "./src/routes/Rmodels.js";
import orderRoutes from "./src/routes/Rorder.js"
import reviewsRoutes from "./src/routes/Rreviews.js";
import vehiclesRoutes from "./src/routes/Rvehicles.js"
import userRoutes from "./src/routes/Ruser.js";
import salesRoutes from "./src/routes/Rsales.js"
import loginRoute from "./src/routes/Rlogin.js";
import logoutRoute from "./src/routes/Rlogout.js";
import cors from "cors";

// Creo una constante que es igual a la libreria que importé
const app = express();

app.use(cookieParser())  

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:5173", // Cambia esto por el origen de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Aplicar middleware CORS con las opciones configuradas
app.use(cors(corsOptions));

//Que acepte datos en json
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/Rbrand", brandRoutes);
app.use("/api/Rcostumers", customersRoutes);
app.use("/api/Rliked", likedRoutes);
app.use("/api/Rmodels", modelsRoutes);
app.use("/api/Rorder", orderRoutes);
app.use("/api/Rreviews", reviewsRoutes);
app.use("/api/Rvehicles", vehiclesRoutes);
app.use("/api/Ruser", userRoutes);
app.use("/api/Rsales", salesRoutes);

app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

// Exporto la constante para poder usar express en otros archivos
export default app;