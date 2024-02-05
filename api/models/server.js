const express = require('express');
const cors = require('cors'); //valida informacion
const {dbConnection} = require('../db/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.concetarDB();
        this.middlewares();
        this.routes();
    }

    async concetarDB(){
        await dbConnection();
    }

    middlewares(){ //metodos de validacion
        this.app.use(express.static('public'));
        this.app.use(cors());// que corra donde sea
        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.usuariosPath, require("../routes/user.routes"));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor ejecutado y esuchando en el puerto: ", this.port);
        })
    }
}

module.exports= Server;