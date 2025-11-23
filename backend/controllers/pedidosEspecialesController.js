const admin = require("firebase-admin");
const db = admin.firestore();

async function crearPedido(req, res) {
    try {
        const pedido = req.body;
        const docRef = await db.collection("pedidosEspeciales").add(pedido);
        res.status(201).json({ mensaje: "Pedido creado", id: docRef.id });
    } catch (error) {
        console.error("Error en crearPedido:", error);
        res.status(500).json({ mensaje: "Error al crear pedido" });
    }
}

module.exports = { crearPedido };
