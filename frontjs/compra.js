document.getElementById("cardNequi").addEventListener("click", function() {
    const img = document.getElementById("imgNequi");

    if (!img.dataset.cambiado) {
        img.src = "img/qrTeloraCakes.jpg";
        img.dataset.cambiado = "true";  
    }
});

const detalleCompra = document.getElementById("detalleCompra");


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
        console.error("Error obteniendo carrito:", err);
        return [];
    }
}

async function renderResumen() {
    const productos = await obtenerCarrito();
    detalleCompra.innerHTML = "";
    let total = 0;

    if (productos.length === 0) {
        detalleCompra.innerHTML = "<p>Tu carrito está vacío</p>";
        return;
    }

    productos.forEach(p => {
        const pElem = document.createElement("p");
        pElem.textContent = `${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}`;
        detalleCompra.appendChild(pElem);

        total += p.precio * p.cantidad;
    });

    detalleCompra.innerHTML += `
        <hr>
        <h3>Total: $${total}</h3>
    `;
}


renderResumen();