const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const {id,apiKey} = req.query;

    res.json({
        msg: 'get API - controller',
        id,
        apiKey
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;
    
    res.json({
        ok: true,
        msg: 'post API - controller',
        nombre,
        edad
    });
}


const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put API - controller',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controller'
    });
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}