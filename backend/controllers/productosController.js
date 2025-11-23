const admin = require("firebase-admin"); // importamos firebase admin
const db = admin.firestore();

async function obtenerProductos(req, res) {
  try {
    const snapshot = await db.collection("productos").get();
    const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
}

module.exports = { obtenerProductos };
