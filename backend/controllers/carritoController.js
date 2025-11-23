const admin = require("firebase-admin");
const db = admin.firestore();

// Obtener carrito de un usuario
async function obtenerCarrito(req, res) {
  const uid = req.uid; // lo obtenemos del token
  try {
    const doc = await db.collection("carritos").doc(uid).get();
    const carrito = doc.exists ? doc.data() : { productos: [] };
    res.json(carrito);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener carrito" });
  }
}

// Agregar producto al carrito
async function agregarAlCarrito(req, res) {
  const uid = req.uid;
  const { id, nombre, precio, cantidad = 1, opciones } = req.body;

  try {
    const ref = db.collection("carritos").doc(uid);
    const doc = await ref.get();
    let carrito = doc.exists ? doc.data() : { productos: [] };

    // Revisar si el producto ya está en el carrito
    const index = carrito.productos.findIndex(p => p.id === id && JSON.stringify(p.opciones) === JSON.stringify(opciones));
    if (index > -1) {
      carrito.productos[index].cantidad += cantidad;
    } else {
      carrito.productos.push({ id, nombre, precio, cantidad, opciones });
    }

    await ref.set(carrito);
    res.json({ message: "Producto agregado al carrito", carrito });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar producto" });
  }
}

// Vaciar carrito (para comprar)
async function vaciarCarrito(req, res) {
  const uid = req.uid;
  try {
    await db.collection("carritos").doc(uid).set({ productos: [] });
    res.json({ message: "Carrito vaciado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
}

module.exports = { obtenerCarrito, agregarAlCarrito, vaciarCarrito };
