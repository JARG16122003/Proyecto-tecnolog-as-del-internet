const carritoContainer = document.getElementById("carrito-container");
const totalSpan = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-btn");
const comprarBtn = document.getElementById("comprar-btn");

async function obtenerCarrito() {
    const token = localStorage.getItem("token");
    if (!token) return [];

    try {
        const res = await fetch("http://localhost:3000/api/carrito", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        return data.productos || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function renderCarrito() {
    const productos = await obtenerCarrito();
    carritoContainer.innerHTML = "";
    let total = 0;

    if (productos.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío </p>";
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

vaciarBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Debes iniciar sesión");

    try {
        await fetch("http://localhost:3000/api/carrito", {
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

/*
comprarBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Debes iniciar sesión");

    try {
        const res = await fetch("http://localhost:3000/api/comprar", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        alert(data.mensaje);
        renderCarrito();
    } catch (err) {
        console.error(err);
        alert("Error al realizar la compra");
    }
});
*/

comprarBtn.addEventListener("click",() => {
    window.location.href = "compra.html";
});
// Inicializar carrito
renderCarrito();
