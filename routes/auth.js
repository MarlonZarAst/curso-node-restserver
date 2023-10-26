const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login );


router.post('/google',[
    check('id_token','id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn)
module.exports = router;