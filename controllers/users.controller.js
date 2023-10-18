const {response, request} = require('express');

const Usuario = require('../models/usuario');

const bcryptjs = require('bcryptjs');



const usuariosGet = async(req = request, res = response) => {

    // const {id,apiKey} = req.query;

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        msg: 'get API - controller',
        usuarios,
        total
    });

}

const usuariosPost = async (req, res = response) => {

    
    const {nombre, correo, password, rol}  = req.body;

    const usuario = new Usuario({nombre, correo, password,rol});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en DB
    await usuario.save();
    
    res.json({
        ok: true,
        msg: 'post API - controller',
        usuario
    });
}


const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id,password, google,correo, ...resto} = req.body;

    if(password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        ok: true,
        msg: 'put API - controller',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});

    res.json({
        usuario
    });
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}