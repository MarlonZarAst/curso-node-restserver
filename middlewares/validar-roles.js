const { response } = require("express");


const esAdminRole = (req, res = response, next) => {

    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol previo a verificar el token'
        });
    }

    const {rol, nombre} = req.usuarioAutenticado;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador - no puede hacer esto`
        });
    }

    next();
}

const tieneRol = (...roles) => {

    return (req, res = response, next) =>{

        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol previo a verificar el token'
            });
        }

        if(!roles.includes(req.usuarioAutenticado.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }

        console.log(roles);
        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRol
};