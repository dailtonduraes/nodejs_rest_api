//connection
const db = require('../banco/dbConnection');

module.exports = class LoginUsuario{
    static cadastrar(dados, callback){

    }

    static logar(dados, callback){
        console.log('teste ' + dados);
        return db.query("SELECT * FROM tb_admin WHERE login = '?' AND senha = '?' ", [dados.login, dados.senha], callback);
    }
}