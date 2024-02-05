const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosPost = async (req, res) =>{
    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario({nombre,correo,password,role});
    const salt = bcryptjs.genSaltSync(); //n vueltas para encriptar
    Usuario.password = bcryptjs.hashSync(password, salt);
    console.log("llegamos aqui previo a guardar");

    try {
        await usuario.save();   
        console.log("Una maquina"); 
    } catch (e) {
        throw Error("Valio chetos el save, chipilin: "+e);
    }
    

    res.status(200).json({
        usuario
    });
}

module.exports = {
    usuariosPost
}