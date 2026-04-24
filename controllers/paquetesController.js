const asyncHandler = require('express-async-handler')
const Paquete = require('../models/paquetesModel')

const getPaquetes = asyncHandler(async (req, res) => {
    const paquetes = await Paquete.find({})
    res.status(200).json(paquetes)
})

const addPaquete = asyncHandler(async (req, res) => {
    if (!req.body.titulo || !req.body.precio || !req.body.descripcion || !req.body.viajes) {
        res.status(400)
        throw new Error("Por favor ingrese todos los campos del paquete")
    }

    const paquete = await Paquete.create({
        titulo: req.body.titulo,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        viajes: req.body.viajes
    })

    if (paquete) {
        res.status(201).json(paquete)
    } else {
        res.status(500)
        throw new Error("Error al crear el paquete")
    }
})

const updatePaquete = asyncHandler(async (req, res) => {
    const paquete = await Paquete.findById(req.params.id)
    if (!paquete) {
        res.status(404)
        throw new Error("Paquete no encontrado")
    }

    const paqueteUpdated = await Paquete.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(paqueteUpdated)
})

const deletePaquete = asyncHandler(async (req, res) => {
    const paquete = await Paquete.findById(req.params.id)
    if (!paquete) {
        res.status(404)
        throw new Error("Paquete no encontrado")
    }

    await Paquete.deleteOne(paquete)
    res.status(200).json({ "Mensaje": `Paquete ${req.params.id} eliminado` })
})

module.exports = {
    getPaquetes,
    addPaquete,
    updatePaquete,
    deletePaquete
}
