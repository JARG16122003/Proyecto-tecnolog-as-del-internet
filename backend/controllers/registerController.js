const admin = require("../firebase"); // tu archivo que inicializa Firebase Admin

async function register(req, res) {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        // Crear usuario en Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: nombre,
        });

        // Guardar extra en Firestore
        await admin.firestore().collection("usuarios").doc(userRecord.uid).set({
            nombre,
            email,
            creado: new Date()
        });

        return res.json({ message: "Usuario creado correctamente" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = register;
