var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:fkUsuario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/GraficoAcertoGeral", function (req, res) {
    medidaController.GraficoAcertoGeral(req, res);
});

module.exports = router;