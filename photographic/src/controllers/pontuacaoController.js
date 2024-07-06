var pontuacaoModel = require("../models/pontuacaoModel");

function cadastrarNota(req, res) {
    var pontos = req.body.NotaServer;
    var id = req.body.UsuarioServer;


    if (pontos == undefined) {
        res.status(400).send("Sua nota está indefinido");
    } else if (id == undefined) {
        res.status(400).send("Seu id está indefinido")
    } else {
        pontuacaoModel.cadastrarNota(id, pontos).then(function(resposta){
            res.status(200).send("Nota registrada com sucesso");
        }).catch(function(erro){
            res.status(500).json(erro.sqlMessage);
        })
    }
}

module.exports = {
    cadastrarNota
}