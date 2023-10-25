const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/users.controller');
const { check } = require('express-validator');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
} = require('../middlewares');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id',
[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre','El nombre tiene que ser ingresado').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password','El password debe de ser de mas de 6 letras').isLength({min:6}),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRol('USER_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);





module.exports = router;