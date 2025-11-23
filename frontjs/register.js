document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    const nombre = document.querySelector('input[placeholder="Nombre"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value; // ✅ Cambiado
    const password = document.querySelector('input[placeholder="Contraseña"]').value;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al registrar el usuario.");
    }
  });
});
