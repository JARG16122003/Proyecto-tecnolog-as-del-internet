const carritoContainer = document.getElementById("carrito-container");
const totalSpan = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-btn");
const comprarBtn = document.getElementById("comprar-btn");

// Definir URL base según entorno
const BASE_URL = window.location.hostname.includes("localhost")
    ? "http://localhost:3000"
    : "https://proyecto-tecnolog-as-del-internet.onrender.com";

// Obtener carrito del backend
async function obtenerCarrito() {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
        const res = await fetch(`${BASE_URL}/api/carrito`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        return data.productos || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Renderizar carrito en la página
async function renderCarrito() {
    const productos = await obtenerCarrito();
    carritoContainer.innerHTML = "";
    let total = 0;

    if (productos.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío</p>";
    }

    productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "producto-carrito";
        div.innerHTML = `
            <p>${p.nombre} x${p.cantidad}</p>
            <p>$${p.precio * p.cantidad}</p>
        `;
        carritoContainer.appendChild(div);
        total += p.precio * p.cantidad;
    });

    totalSpan.textContent = total;
}

// Vaciar carrito
vaciarBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Debes iniciar sesión");

    try {
        await fetch(`${BASE_URL}/api/carrito`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        alert("Carrito vaciado");
        renderCarrito();
    } catch (err) {
        console.error(err);
        alert("Error al vaciar carrito");
    }
});

// Redirigir a compra
comprarBtn.addEventListener("click", () => {
    window.location.href = "compra.html";
});

// Inicializar carrito
renderCarrito();
