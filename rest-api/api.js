//
const express = require('express');
const bodyParser = require('body-parser');

//
const cors = require('cors')
const api = express();
const porta = 4000;
const router = express.Router();

//routers
const catalogoRouter = require('./router/catalogoRouter');
const loginRouter = require('./router/loginRouter');

api.use(cors());

//
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json({ limit: '20mb', extended: true }));
api.use('/public', express.static(__dirname+'/public'));



router.get("/", (req, resp) => resp.json({
    mensagem: '=> API ESTA RODANDOooo .... =)'
})
);

//
api.use('/', router);
api.use('/catalogo', catalogoRouter);
api.use('/login', loginRouter);

//
api.listen(porta);

//debug
console.log('RUN API ....');