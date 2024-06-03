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