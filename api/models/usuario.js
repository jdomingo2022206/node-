const { Schema, model } = require("mongoose");

const UsuarioSchema= Schema({
    nombre: {
        type: String,
        require: [true, "el nombre es obligatorio"] 
    },
    correo: {
        type: String,
        require: [true, "el correo es obligatorio"] 
    },
    password: {
        type: String,
        require: [true, "el password es obligatorio"] 
    },
    img: {
        type: String,
        require: [true, "el img es obligatorio"] 
    },
    rol: {
        type: String,
        require: true,
        anum: ["ADMIN_ROLE", "USER_ROLE"] 
    },
    estado: {
        type: Boolean,
        default: true 
    },
    google: {
        type: Boolean,
        default: false 
    }
});

/*UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.Object();
    return usuario;
}*/

module.exports = model('Usuario', UsuarioSchema)