//connection
const db = require('../banco/dbConnection');

module.exports = class GaleriaProdutos{

    //listar todos os produtos
    static exibirTodos(callback){
        let retornoSql = "SELECT \
                            id, vc_nome, \
                            vc_path, it_status, \
                          CASE \
                            WHEN it_status = 0 THEN 'Pendente' \
                            WHEN it_status = 1 THEN 'Em analise' \
                            WHEN it_status = 2 THEN 'Aprovado' \
                            WHEN it_status = 3 THEN 'Reprovado' \
                          END as status_formatado  \
                          FROM tb_catalogo_produtos ORDER BY id DESC";
        return db.query(retornoSql, callback);
    }

    //retornando produto pelo id
    static getId(id, callback){
        return db.query("SELECT * FROM tb_catalogo_produtos WHERE id = ? ", [id], callback);
    }

    //busca de produto pelo nome
    static busca(nomeLike, callback){
        return db.query("SELECT * FROM tb_catalogo_produtos WHERE vc_nome LIKE  ? ", "%"+[nomeLike]+"%", callback);
    }

    //adicionando dados galeria produtos
    static adicionar(dados, callback){
        return db.query("INSERT INTO tb_catalogo_produtos (vc_nome, vc_path, it_status) VALUES(?, ?, ?)", [dados.vc_nome, dados.vc_path, dados.it_status], callback);
    }

    //editando dados
    static editar(dados, callback){
        if(dados.vc_path != null){
            return db.query("UPDATE tb_catalogo_produtos SET vc_nome = ?, it_status = ?, vc_path = ?  WHERE id = ?",
            [dados.vc_nome, dados.it_status, dados.vc_path, dados.id], callback);
        }else{
            return db.query("UPDATE tb_catalogo_produtos SET vc_nome = ?, it_status = ? WHERE id = ?",
            [dados.vc_nome, dados.it_status, dados.id], callback);
        }
    }

     //deletando produto pelo id
     static deleteProduto(id, callback){
        return db.query("DELETE FROM tb_catalogo_produtos WHERE id = ? ", [id], callback);
    }

    static retornaPathArquivo(id, callback){
        return db.query("SELECT vc_path FROM tb_catalogo_produtos WHERE id = ? ", [id], callback);
    }
}