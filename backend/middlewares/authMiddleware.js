const admin = require("firebase-admin");

async function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No autorizado" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid; // guardamos uid del usuario
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = { verificarToken };
