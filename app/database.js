import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

// Configuración de la conexión a MySQL usando variables de entorno
const conexion = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Sofia301214*",
    database: "dbbori"
});

// Ejecutar la conexión
conexion.connect(function(error) {
    if (error) {
        console.error("Error de conexión a la base de datos: ", error);
        return;
    }
    console.log("Conexión a la base de datos exitosa");
});

export default conexion;
