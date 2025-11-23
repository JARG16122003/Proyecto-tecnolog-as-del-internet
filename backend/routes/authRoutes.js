const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// REGISTRO
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: nombre
    });

    // Puedes guardar datos adicionales en Firestore
    await admin.firestore().collection("usuarios").doc(userRecord.uid).set({
      nombre,
      email,
      creado: new Date()
    });

    res.json({ message: "Usuario registrado correctamente ✔", uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  res.json({ message: "Login se maneja desde Firebase Web Auth (frontend)" });
});

module.exports = router;
