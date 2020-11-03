//
express = require('express');
const router = express.Router();

//MODELS
const GaleriaModel = require('../model/GaleriaProdutos');
const RepostaCls = require('../model/RepostaCls');

//DIRETÓRIO PUBLICO ONDE SERÃO SALVA AS FOTOS DO PRODUTO
let dirPublic = "./public/uploads/";

let multer = require('multer');
let path = require('path');

let multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dirPublic);
    },
    filename: function (req, file, cb) {
        //cb(null, file.filename + '-' + Date.now())      
        let nomeArquivo =
            `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
        req.body.vc_path = dirPublic + nomeArquivo;
        cb(null, nomeArquivo);
    }
});

let upload = multer({ storage: multerStorage });

//deletar arquivo
function delArquivo(caminho) {
    if (caminho != null) {
        fs.unlinkSync(caminho);
        console.log('Arquivo deletado com sucesso'); //debug
    }
}

//adicionar
router.post("/", upload.single('arquivo'), function (req, resp, next) {
    let resposta = new RepostaCls();
    if (req.file != null) {
        GaleriaModel.adicionar(req.body, function (error, retorno) {
            if (error) {
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro ";
                console.log("error: ", error); //debug
                delArquivo(req.body.vc_path);
            } else {
                if (retorno.affectedRows > 0) {
                    resposta.msg = "Dados cadastrados com sucesso";
                } else {
                    resposta.erro = true;
                    resposta.msg = "Não foi possível realizar a operação ";
                    console.log("error: ", error); //debug
                    delArquivo(req.body.vc_path);
                }
            }
            console.log('resp', resposta); //debug
            resp.json(resposta);
        });

    } else {
        resposta.erro = true;
        resposta.msg = "Não foi enviado arquivo  de imagem!!! ";
        console.log("error: ", resposta.msg); //debug
        resp.json(resposta);
    }
})


//editar
router.put("/", upload.single('arquivo'), function (req, resp, next) {
    let resposta = new RepostaCls();

    GaleriaModel.editar(req.body, function (error, retorno) {
        if (error) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro ";
            console.log("error: ", error); //debug
            delArquivo(req.body.vc_path);
        } else {
            if (retorno.affectedRows > 0) {
                resposta.msg = "Dados alterados com sucesso";
            } else {
                resposta.erro = true;
                resposta.msg = "Não foi possível alterar os dados";
                console.log("error: ", error); //debug
                delArquivo(req.body.vc_path);
            }
        }
        console.log('resp =>', resposta); //debug
        resp.json(resposta);
    });
})

//exibir todos
router.get("/", function (req, resp, next) {
    GaleriaModel.exibirTodos(function (error, retorno) {
        let resposta = new RepostaCls();
        if (error) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro!!! ";
            console.log("error: ", error); //debug
        } else {
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
})

//retorno pelo ID
router.get("/:id?", function (req, resp, next) {
    GaleriaModel.getId(req.params.id, function (error, retorno) {
        let resposta = new RepostaCls();
        if (error) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro!!! ";
            console.log("error: ", error); //debug
        } else {
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
})

//retorno busca produto pelo nome
router.get("/search/:busca?", function (req, resp, next) {
    GaleriaModel.busca(req.params.busca, function (error, retorno) {
        let resposta = new RepostaCls();
        if (error) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro!!! ";
            console.log("error: ", error); //debug
        } else {
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
})


//delete pelo ID
router.delete("/:id?", function (req, resp, next) {
    GaleriaModel.deleteProduto(req.params.id, function (error, retorno) {
        let resposta = new RepostaCls();
        if (error) {
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro!!! ";
            console.log("error: ", error); //debug
        } else {
            if (retorno.affectedRows > 0) {
                resposta.msg = "Dados excluidos com sucesso com sucesso";
            } else {
                resposta.erro = true;
                resposta.msg = "Não foi possível alterar os dados";
                console.log("error: ", error); //debug
            }
        }
        resp.json(resposta);
    });
})

module.exports = router;