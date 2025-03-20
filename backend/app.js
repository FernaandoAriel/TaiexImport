// Importo todo lo de la libreria de Express
import express from "express";


// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web


// Exporto la constante para poder usar express en otros archivos
export default app;