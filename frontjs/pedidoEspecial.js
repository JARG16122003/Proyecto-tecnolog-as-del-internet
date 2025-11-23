document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pedidoForm");
    const tipoEntrega = document.getElementById("tipoEntrega");
    const direccionContainer = document.getElementById("direccionContainer");

    tipoEntrega.addEventListener("change", () => {
        direccionContainer.style.display = tipoEntrega.value === "domicilio" ? "block" : "none";
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

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
            const response = await fetch("/api/pedidosEspeciales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedido)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Pedido enviado con éxito. ID: ${data.id}`);
                form.reset();
                direccionContainer.style.display = "none";
            } else {
                alert(`Error al enviar pedido: ${data.mensaje}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al enviar el pedido.");
        }
    });
});
