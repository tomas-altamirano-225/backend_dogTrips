const asyncHandler = require('express-async-handler')
const Paquete = require('../models/paquetesModel')

const getPaquetes = asyncHandler(async (req, res) => {
    const paquetes = await Paquete.find()
    res.status(200).json(paquetes)
})

const setPaquete = asyncHandler(async (req, res) => {
    if (!req.body.titulo || !req.body.viajes || !req.body.precio || !req.body.descripcion) {
        res.status(400)
        throw new Error('Por favor teclea todos los campos obligatorios del paquete')
    }
    const paquete = await Paquete.create({
        titulo: req.body.titulo,
        precio: Number(req.body.precio),
        descripcion: req.body.descripcion,
        viajes: Number(req.body.viajes)
    })
    res.status(201).json(paquete)
})

const updatePaquete = asyncHandler(async (req, res) => {
    const paquete = await Paquete.findById(req.params.id)
    if (!paquete) {
        res.status(404)
        throw new Error('Paquete no encontrado')
    }
    const paqueteUpdated = await Paquete.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(paqueteUpdated)
})

const deletePaquete = asyncHandler(async (req, res) => {
    const paquete = await Paquete.findById(req.params.id)
    if (!paquete) {
        res.status(404)
        throw new Error('Paquete no encontrado')
    }
    await paquete.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPaquetes,
    setPaquete,
    updatePaquete,
    deletePaquete
}
