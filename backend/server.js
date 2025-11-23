const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");




// Inicialización de Express
const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 🔹 Rutas API
const authRoutes = require("./routes/authRoutes");
const pedidosEspecialesRoutes = require("./routes/pedidosEspecialesRoutes");
const productosRoutes = require("./routes/productosRoutes");
const carritoRoutes = require("./routes/carritoRoutes");




app.use("/api", authRoutes);                // /api/register y /api/login
app.use("/api", pedidosEspecialesRoutes);   // /api/pedidosEspeciales
app.use("/api", productosRoutes);
app.use("/api", carritoRoutes); // /api/carrito
// 🔹 Servir frontend
app.use(express.static(path.join(__dirname, ".."))); // donde están tus HTML

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../pedido.html")));

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
