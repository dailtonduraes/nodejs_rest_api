//
express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//MODELS
const LoginUsuario = require('../model/LoginUsuario');
const RepostaCls = require('../model/RepostaCls');

//LOGAR
router.post("/", function (req, resp, next) {
    LoginUsuario.logar(req.body, function (error, retorno) {
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

module.exports = router;