import express from "express";

//Fix para _dirname
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { methods as authentication } from "./controllers/authentication.controller.js";
const _dirname = path.dirname(fileURLToPath(import.meta.url));

//Server
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto ",app.get("port"));

//Middlewares
app.use(morgan("dev"));


//Configuracion
app.use(express.static(_dirname + "/public"));
app.use(express.json());

//Rutas
app.get("/",(req,res)=> res.sendFile(_dirname + "/pages/home.html"));
app.get("/login.html",(req,res)=> res.sendFile(_dirname + "/pages/login.html"));
app.get("/register.html",(req,res)=> res.sendFile(_dirname + "/pages/register.html"));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});