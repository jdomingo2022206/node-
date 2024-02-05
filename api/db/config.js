const mongoose = require('mongoose');
const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log ('Base de datos conectada con exito')
    } catch (e) {
        throw new Error('Chipilin con la DB', e)
    }
}

module.exports = {
    dbConnection
}