//CRIANDO CONEXAO CONEXAO BANCO DE DADOS MYSQL

const mysql = require('mysql');

let connection = mysql.createPool({
    host:'localhost',
    user :'root',
    password : '',
    port: 3306, //PORTA PADRÃO 3306 MAS POR ALGUM MOTIVO MEU MYSQL ESTA NESSA 3308 =)
    database : 'db_catalogo'
})

module.exports = connection;