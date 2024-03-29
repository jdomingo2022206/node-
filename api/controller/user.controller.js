const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarioByID = async (req, res)=>{
    const {id} = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}

const usuariosGet = async (req, res = response)=>{
    const {limite, desde} = req.query; // verifiacr si tiene query params
    const query= {estado: true}; // valide si el estado esta en true
    const [total, /*de documentos*/ usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res) =>{
    const {id} = req.params;
    //sprid operator, y operador ternario
    const {_id, password, google, correo, ...resto} = req.body;
    const usaurio = await Usuario.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg : "Usuario actualizados"
    });
}

const usuariosDelete = async (req, res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.status(200).json({
        msg : "Usuario eliminado"
    });
}

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
    usuariosDelete,
    usuariosPost,
    usuariosGet,
    getUsuarioByID,
    usuariosPut
}