const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeUsuarioByID } = require('../helpers/db-validator');
//const {existeUsuarioByID} = require('../helpers/db-validator'); 
const { usuariosPost, usuariosGet, getUsuarioByID, usuariosPut, usuariosDelete } = require('../controller/user.controller');
const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id", 
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioByID),
        validarCampos
    ], getUsuarioByID);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioByID),
        validarCampos
], usuariosPut)

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioByID),
        validarCampos
], usuariosDelete)

router.post(
    "/",//a la raiz de la url base
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El nombre debe tener mas de 6 caracteres").isLength({min: 6,}),
        check("correo","Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],usuariosPost);

module.exports =router;