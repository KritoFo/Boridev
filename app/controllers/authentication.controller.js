import bcrypt from "bcrypt";
import conexion from "../database.js";

async function login(req, res) {
    const { email, password } = req.body;

// Validar campos incompletos
    if (!email || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

// Buscar usuario por email
    const usuario = usuarios.find(usuario => usuario.email === email);
    if (!usuario) {
        return res.status(400).send({ status: "Error", message: "Usuario no encontrado" });
    }

// Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
        return res.status(400).send({ status: "Error", message: "Contraseña incorrecta" });
    }

    res.status(200).send({ status: "Success", message: "Inicio de sesión exitoso" });
}

async function register(req, res) {
    const { nombre, identificacion, email, password, direccion, telefono } = req.body;

// Validar campos incompletos
    if (!nombre || !identificacion || !email || !password || !direccion || !telefono) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

// Verificar si el usuario ya existe
    const usuarioExistente = await verificarUsuarioExistente(email);
    if (usuarioExistente) {
        return res.status(400).send({ status: "Error", message: "Este usuario ya existe." });
    }

// Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

// Agregar el nuevo usuario a la lista de usuarios
    try {
        await conexion.promise().query(
            "INSERT INTO usuarios (nombre, identificacion, email, password, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, identificacion, email, hashedPassword, direccion, telefono]
        );
        res.status(201).send({ status: "Success", message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar usuario en la base de datos: ", error);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}

async function verificarUsuarioExistente(email) {
    const [rows, fields] = await conexion.promise().query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );
    return rows.length > 0;
}

export const methods = {
    login,
    register
};
