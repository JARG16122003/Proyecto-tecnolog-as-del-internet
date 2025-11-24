document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");

  // Definir URL base según entorno
  const BASE_URL = window.location.hostname.includes("localhost")
      ? "http://localhost:3000"
      : "https://proyecto-tecnolog-as-del-internet.onrender.com";

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const nombre = document.querySelector('input[placeholder="Nombre"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Contraseña"]').value;

    if (!nombre || !email || !password) {
      return alert("Por favor completa todos los campos");
    }

    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al registrar el usuario.");
    }
  });
});
