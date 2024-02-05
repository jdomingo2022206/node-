const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeUsuarioByID } = require('../helpers/db-validator');
//const {existeUsuarioByID} = require('../helpers/db-validator'); 
const { usuariosPost } = require('../controller/user.controller');
const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El nombre debe tener mas de 6 caracteres").isLength({min: 6,}),
        check("correo","Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],usuariosPost);

module.exports =router;