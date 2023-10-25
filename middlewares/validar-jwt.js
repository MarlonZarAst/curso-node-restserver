const { response } = require("express")
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }
    console.log(token);

    try{

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuarioAutenticado =  await Usuario.findById(uid);
        console.log(uid);
        console.log(usuarioAutenticado);
        req.uid = uid;

        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }

        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            });
        }
        req.usuarioAutenticado = usuarioAutenticado

        next();
    }catch(err){

        console.log(err);
        res.status(401).json({
            msg:'Token no valido'
        });

    }
    

}

module.exports = {
    validarJWT
}