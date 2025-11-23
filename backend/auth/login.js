const admin = require("../firebase");
const firebase = require("firebase/app");
require("firebase/auth");

const firebaseConfig = {
    apiKey: "TU_API_KEY_DE_FIREBASE",
    authDomain: "terola-55d76.firebaseapp.com",
};

firebase.initializeApp(firebaseConfig);

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        const userCredential = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

        const token = await userCredential.user.getIdToken();

        return res.json({
            message: "Login correcto",
            token,
            uid: userCredential.user.uid
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = login;
