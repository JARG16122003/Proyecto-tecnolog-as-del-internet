const express = require("express");
const router = express.Router();
const { crearPedido } = require("../controllers/pedidosEspecialesController");

router.post("/pedidosEspeciales", crearPedido);

module.exports = router;
