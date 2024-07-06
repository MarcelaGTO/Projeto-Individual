var database = require("../database/config");

function cadastrarNota(id, pontos) {
    var instrucao = `
        INSERT INTO quiz (fkUsuario,acertos) VALUES (${id}, '${pontos}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
  
module.exports = {
    cadastrarNota
};