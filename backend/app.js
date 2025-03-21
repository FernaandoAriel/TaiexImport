// Importo todo lo de la libreria de Express
import express from "express";
import brandRoutes from "./src/routes/Rbrand.js";
import customersRoutes from "./src/routes/Rcustomers.js";
import likedRoutes from "./src/routes/Rliked.js";
import modelsRoutes from "./src/routes/Rmodels.js";
import orderRoutes from "./src/routes/Rorder.js"
import reviewsRoutes from "./src/routes/Rreviews.js";
import usersRoutes from "./src/routes/Rusers.js"
import vehiclesRoutes from "./src/routes/Rvehicles.js"


// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/Rbrand", brandRoutes);
app.use("/api/Rcostumers", customersRoutes);
app.use("/api/Rliked", likedRoutes);
app.use("/api/Rmodels", modelsRoutes);
app.use("/api/Rorder", orderRoutes);
app.use("/api/Rreviews", reviewsRoutes);
app.use("/api/Rusers", usersRoutes);
app.use("/api/Rvehicles", vehiclesRoutes);


// Exporto la constante para poder usar express en otros archivos
export default app;