const asyncHandler = require('express-async-handler')
const Viaje = require('../models/viajeModel')

const getViajes = asyncHandler(async (req, res) => {
    const viajes = await Viaje.find().populate('paseadores')
    res.status(200).json(viajes)
})

const setViaje = asyncHandler(async (req, res) => {
    if (!req.body.fecha || !req.body.hora_salida || !req.body.destino || !req.body.capacidad_maxima) {
        res.status(400)
        throw new Error('Por favor teclea todos los campos obligatorios del viaje')
    }
    const viaje = await Viaje.create(req.body)
    res.status(201).json(viaje)
})

const updateViaje = asyncHandler(async (req, res) => {
    const viaje = await Viaje.findById(req.params.id)
    if (!viaje) {
        res.status(404)
        throw new Error('Viaje no encontrado')
    }
    const viajeUpdated = await Viaje.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(viajeUpdated)
})

const deleteViaje = asyncHandler(async (req, res) => {
    const viaje = await Viaje.findById(req.params.id)
    if (!viaje) {
        res.status(404)
        throw new Error('Viaje no encontrado')
    }
    await viaje.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getViajes,
    setViaje,
    updateViaje,
    deleteViaje
}
