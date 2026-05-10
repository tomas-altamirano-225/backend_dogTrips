const asyncHandler = require('express-async-handler')
const Paseador = require('../models/paseadorModel')

const getPaseadores = asyncHandler(async (req, res) => {
    const paseadores = await Paseador.find()
    res.status(200).json(paseadores)
})

const setPaseador = asyncHandler(async (req, res) => {
    if (!req.body.nombre || !req.body.email || !req.body.telefono) {
        res.status(400)
        throw new Error('Por favor teclea todos los campos obligatorios del paseador')
    }
    const paseador = await Paseador.create(req.body)
    res.status(201).json(paseador)
})

const updatePaseador = asyncHandler(async (req, res) => {
    const paseador = await Paseador.findById(req.params.id)
    if (!paseador) {
        res.status(404)
        throw new Error('Paseador no encontrado')
    }
    const paseadorUpdated = await Paseador.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(paseadorUpdated)
})

const deletePaseador = asyncHandler(async (req, res) => {
    const paseador = await Paseador.findById(req.params.id)
    if (!paseador) {
        res.status(404)
        throw new Error('Paseador no encontrado')
    }
    await paseador.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPaseadores,
    setPaseador,
    updatePaseador,
    deletePaseador
}
