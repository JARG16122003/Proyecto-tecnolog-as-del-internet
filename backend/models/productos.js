class Producto {
  constructor({ id, nombre, descripcion, precioBase, categoria, imagen, opciones, porcionesOpciones, miniDescripcion }) {
    this.id = id || null;
    this.nombre = nombre;
    this.descripcion = descripcion || "";
    this.precioBase = precioBase || 0;
    this.categoria = categoria || "";
    this.imagen = imagen || "";
    this.opciones = opciones || {};
    this.porcionesOpciones = porcionesOpciones || [];
    this.miniDescripcion = miniDescripcion || "";
  }
}

module.exports = Producto;
