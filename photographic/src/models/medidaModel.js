var database = require("../database/config");

function buscarUltimasMedidas(fkUsuario) {
    var instrucaoSql = `SELECT 
    acertos FROM quiz WHERE fkUsuario = ${fkUsuario}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function GraficoAcertoGeral() {
    var instrucaoSql = `
        SELECT usuario.nome AS NomeUsuario, 
        quiz.acertos AS AcertosTotal
        FROM usuario 
        INNER JOIN quiz ON usuario.id = quiz.fkUsuario
        INNER JOIN 
        (SELECT fkUsuario, MAX(dtHora) AS UltimaTentativa
        FROM quiz
        GROUP BY fkUsuario) AS ultima_tentativa 
            ON quiz.fkUsuario = ultima_tentativa.fkUsuario 
            AND quiz.dtHora = ultima_tentativa.UltimaTentativa;  
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    GraficoAcertoGeral
}
