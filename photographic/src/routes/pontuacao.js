var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

router.post("/cadastrarNota", function(req, res) {
    pontuacaoController.cadastrarNota(req, res);
});

module.exports = router;