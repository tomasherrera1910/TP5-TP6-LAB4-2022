const instrumentosRouter = require('express').Router()
const Instrumento = require('../models/Instrumento.js')

instrumentosRouter.get('/', (req, res) => {
    Instrumento.find({})
    .then(instrumentos => res.json(instrumentos))
})

instrumentosRouter.get('/:id', (req, res) => {
    const {id} = req.params
    Instrumento.findById(id)
    .then(instrumento => {
    instrumento ? res.json(instrumento)
                : res.status(404)
    })
})

instrumentosRouter.post('/', async(req,res) => {
    const {body} = req
    const {nombre, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion} = body
    
    if(!nombre || !marca || !modelo || !imagen || !precio || !costoEnvio || !cantidadVendida || !descripcion){
        return res.status(404).json({"error":"Todos los campos son obligatorios"})
    }
    const newInstrumento = new Instrumento({
        nombre,
        marca,
        modelo,
        imagen,
        precio,
        costoEnvio,
        cantidadVendida,
        descripcion
    })
    try{
     const savedInstrumento = await newInstrumento.save()
     res.status(201).json(savedInstrumento)
    }catch(error){
        res.status(500).send(error)
    }
})

instrumentosRouter.put('/:id', (req,res) => {
    const {id} = req.params
    const {body} = req
    const {nombre, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion} = body
    const updatedInstrumento = {
        nombre,
        marca,
        modelo,
        imagen,
        precio,
        costoEnvio,
        cantidadVendida,
        descripcion
    }
    Instrumento.findByIdAndUpdate(id, updatedInstrumento, {new:true})
    .then(result => {
          result ? res.json(result)
                 : res.status(404).end()
        })
    .catch(error => res.status(500).json(error))
})
instrumentosRouter.delete('/:id',(req, res) => {
const {id} = req.params
Instrumento.findByIdAndDelete(id)
.then(result => {
    result ? res.status(201).json(result)
           : res.status(404).end()
})
.catch(error => res.status(500).json(error))
})

module.exports = instrumentosRouter