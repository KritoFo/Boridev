// Botones

document.addEventListener("DOMContentLoaded", function() {
    var btnRegistro = document.getElementById("Registro");

    // Agrega un evento de clic al botón "Registro"
    btnRegistro.addEventListener("click", function() {
        // Redirecciona a la página del formulario de registro
        window.location.href = "register.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var btnLogin = document.getElementById("Login");

    // Agrega un evento de clic al botón "Login"
    btnLogin.addEventListener("click", function() {
        // Redirecciona a la página del formulario de Login
        window.location.href = "login.html";
    });
});

document.getElementById("registration-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e);

    try {
        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: e.target.elements.nombre.value,
                identificacion: e.target.elements.identificacion.value,
                email: e.target.elements.email.value,
                password: e.target.elements.password.value,
                direccion: e.target.elements.direccion.value,
                telefono: e.target.elements.telefono.value,
            })
        });

        if (!res.ok) {
            throw new Error('Error en el registro');
        }

        const data = await res.json();
        alert('Registro exitoso!');
    } catch (error) {
        console.error(error);
        alert('Hubo un problema con el registro.');
    }
});