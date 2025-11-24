document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pedidoForm");
    const tipoEntrega = document.getElementById("tipoEntrega");
    const direccionContainer = document.getElementById("direccionContainer");

    // Mostrar u ocultar campos de dirección según tipo de entrega
    tipoEntrega.addEventListener("change", () => {
        direccionContainer.style.display = tipoEntrega.value === "domicilio" ? "block" : "none";
    });

    // Definir la URL base según entorno (local o producción)
    const BASE_URL = window.location.hostname.includes("localhost")
        ? "http://localhost:3000"
        : "https://proyecto-tecnolog-as-del-internet.onrender.com";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión para enviar un pedido");
            return;
        }

        const pedido = {
            nombre: form.nombre.value,
            email: form.email.value,
            celular: form.celular.value,
            tipoEntrega: form.tipoEntrega.value,
            direccion: form.direccion.value || "",
            ciudad: form.ciudad.value || "",
            codigoPostal: form.codigoPostal.value || "",
            fechaEntrega: form.fechaEntrega.value,
            detalles: form.detalles.value
        };

        try {
            const response = await fetch(`${BASE_URL}/api/pedidosEspeciales`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // enviar token para validar usuario
                },
                body: JSON.stringify(pedido)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Pedido enviado con éxito. ID: ${data.id}`);
                form.reset();
                direccionContainer.style.display = "none";
            } else {
                alert(`Error al enviar pedido: ${data.mensaje || "Inténtalo de nuevo"}`);
            }
        } catch (error) {
            console.error("Error enviando pedido:", error);
            alert("Ocurrió un error al enviar el pedido.");
        }
    });
});
