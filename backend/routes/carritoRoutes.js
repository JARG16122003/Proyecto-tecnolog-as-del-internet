const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { verificarToken } = require("../middlewares/authMiddleware");

// Agregar producto al carrito
router.post("/carrito", verificarToken, async (req, res) => {
  const { uid } = req;
  const producto = req.body;

  try {
    const userRef = admin.firestore().collection("carritos").doc(uid);
    const doc = await userRef.get();

    let carrito = doc.exists ? doc.data().productos : [];

    // si el producto ya está, sumamos cantidad
    const index = carrito.findIndex(p => p.id === producto.id);
    if (index >= 0) {
      carrito[index].cantidad += producto.cantidad || 1;
    } else {
      carrito.push({ ...producto, cantidad: producto.cantidad || 1 });
    }

    await userRef.set({ productos: carrito });
    res.json({ mensaje: "Producto agregado", carrito });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar producto" });
  }
});

// Obtener carrito
router.get("/carrito", verificarToken, async (req, res) => {
  const { uid } = req;
  try {
    const doc = await admin.firestore().collection("carritos").doc(uid).get();
    const carrito = doc.exists ? doc.data().productos : [];
    res.json({ productos: carrito });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener carrito" });
  }
});

// Vaciar carrito
router.delete("/carrito", verificarToken, async (req, res) => {
  const { uid } = req;
  try {
    await admin.firestore().collection("carritos").doc(uid).set({ productos: [] });
    res.json({ mensaje: "Carrito vaciado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
});

module.exports = router;
