const contenedor = document.querySelector(".container-2");
const botones = document.querySelectorAll(".sidebar button");
let productos = [];

// 🔹 URL base según entorno
const BASE_URL = window.location.hostname.includes("localhost")
    ? "http://localhost:3000"
    : "https://proyecto-tecnolog-as-del-internet.onrender.com";

// 🔹 1. Cargar productos desde backend
async function cargarProductos() {
  try {
    const response = await fetch(`${BASE_URL}/api/productos`);
    productos = await response.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// 🔹 2. Función para agregar producto al carrito
async function agregarProductoAlCarrito(producto, token) {
  try {
    // Traer carrito actual de localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si ya existe el producto
    const index = carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      carrito[index].cantidad += producto.cantidad;
    } else {
      carrito.push(producto);
    }

    // Guardar carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Enviar al backend para persistencia
    if (token) {
      await fetch(`${BASE_URL}/api/carrito`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(producto)
      });
    }

    alert(`Producto agregado al carrito ✔ (${producto.cantidad} unidad(es))`);
  } catch (err) {
    console.error(err);
    alert("Error al agregar al carrito");
  }
}

// 🔹 3. Mostrar productos
function mostrarProductos(lista) {
  contenedor.innerHTML = "";

  lista.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("card");

    let opcionesHTML = "";
    if (prod.porcionesOpciones) {
      prod.porcionesOpciones.forEach(op => {
        opcionesHTML += `<label><input type="checkbox"> ${op.porciones} - $${op.precio}</label><br>`;
      });
    }

    let cupcakesHTML = "";
    if (prod.categoria === "Cupcakes" && prod.opciones) {
      const { masa, cobertura, rellenos } = prod.opciones;
      cupcakesHTML += "<p><b>Opciones:</b></p>";
      if (masa) cupcakesHTML += `<p>Masa: ${masa.map(m => m.nombre).join(", ")}</p>`;
      if (cobertura) cupcakesHTML += `<p>Cobertura: ${cobertura.map(c => c.nombre).join(", ")}</p>`;
      if (rellenos) cupcakesHTML += `<p>Rellenos: ${rellenos.map(r => r.nombre).join(", ")}</p>`;
    }

    div.innerHTML = `
      <div class="card-front">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="price">$${prod.precioBase || prod.precio}</p>
        <button class="add-btn">Ver detalles</button>
      </div>
      <div class="card-back">
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion || prod.miniDescripcion}</p>
        <div class="options">${opcionesHTML}</div>
        <div class="cupcakes-options">${cupcakesHTML}</div>
        <input type="number" class="cantidad" value="1" min="1" style="width:50px;">
        <button class="add-cart-btn">Agregar al carrito</button>
        <button class="back-btn">Volver</button>
      </div>
    `;

    const addBtn = div.querySelector(".add-btn");
    const backBtn = div.querySelector(".back-btn");
    const addCartBtn = div.querySelector(".add-cart-btn");
    const cantidadInput = div.querySelector(".cantidad");

    addBtn.addEventListener("click", () => div.classList.add("flipped"));
    backBtn.addEventListener("click", () => div.classList.remove("flipped"));

    addCartBtn.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Debes iniciar sesión para agregar al carrito");

      const producto = {
        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precioBase || prod.precio,
        cantidad: parseInt(cantidadInput.value)
      };

      agregarProductoAlCarrito(producto, token);
    });

    contenedor.appendChild(div);
  });
}

// 🔹 4. Filtros por categoría
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    document.querySelector(".active")?.classList.remove("active");
    boton.classList.add("active");

    const categoria = boton.textContent;
    if (["Dulces","Pasteles","Tortas","Salados","Cupcakes","Galletas"].includes(categoria)) {
      mostrarProductos(productos.filter(p => p.categoria === categoria));
    } else {
      mostrarProductos(productos);
    }
  });
});

// 🔹 Inicializar
cargarProductos();
