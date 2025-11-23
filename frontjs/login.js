document.addEventListener("DOMContentLoaded", () => {

    const firebaseConfig = {
        apiKey: "AIzaSyAnj7lQ-7b-6NQ68jITBwlnPGe1esVbJ44",
        authDomain: "terola-55d76.firebaseapp.com",
        projectId: "terola-55d76",
        storageBucket: "terola-55d76.firebasestorage.app",
        messagingSenderId: "561599777914",
        appId: "1:561599777914:web:5467ac09692bd23369bfc3"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // Botón de login
    const btn = document.querySelector("button");

    btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = document.querySelector('input[placeholder="Correo electrónico"]').value;
        const password = document.querySelector('input[placeholder="Contraseña"]').value;

        if (!email || !password) {
            return alert("Por favor ingresa correo y contraseña");
        }

        try {
            // Login con Firebase
            const userCredential = await auth.signInWithEmailAndPassword(email, password);

            // Obtener token del usuario
            const token = await userCredential.user.getIdToken();

            // Guardar token y uid en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("uid", userCredential.user.uid);

            alert("Inicio de sesión exitoso ✔");

            // Redirigir a la página de productos o carrito
            window.location.href = "index.html";

        } catch (error) {
            alert(error.message);
            console.error("Error de login:", error);
        }
    });
});
