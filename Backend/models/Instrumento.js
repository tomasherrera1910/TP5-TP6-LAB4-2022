const mongoose = require('mongoose')
const {Schema, model} = mongoose

const instrumentoSchema = new Schema({
    nombre: String,
    marca: String,
    modelo: String,
    imagen: String,
    precio: Number,
    costoEnvio: Number,
    cantidadVendida: Number,
    descripcion: String
})

instrumentoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Instrumento = model('Instrument', instrumentoSchema)

module.exports = Instrumento