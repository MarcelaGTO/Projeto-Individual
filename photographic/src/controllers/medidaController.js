var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {
    var {fkUsuario} = req.params

    medidaModel.buscarUltimasMedidas(fkUsuario)
        .then(result => res.status(200).json(result))
        .catch(erro => {
            console.error('Erro', erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

function GraficoAcertoGeral(req, res) {
    medidaModel.GraficoAcertoGeral()
        .then(result => res.status(200).json(result))
        .catch(erro => {
            console.error('Erro', erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarUltimasMedidas,
    GraficoAcertoGeral
}