const asyncHandler = require('express-async-handler')
const Mascota = require('../models/mascotaModel')

const getMascotas = asyncHandler(async (req, res) => {
    const mascotas = await Mascota.find({ usuario: req.usuario.id }).populate('usuario')
    res.status(200).json(mascotas)
})

const setMascota = asyncHandler(async (req, res) => {
    if (!req.body.nombre) {
        res.status(400)
        throw new Error('Por favor teclea el nombre de la mascota')
    }
    const mascota = await Mascota.create({
        ...req.body,
        usuario: req.usuario.id
    })
    res.status(201).json(mascota)
})

const updateMascota = asyncHandler(async (req, res) => {
    const mascota = await Mascota.findById(req.params.id)
    if (!mascota) {
        res.status(404)
        throw new Error('Mascota no encontrada')
    }
    if (mascota.usuario.toString() !== req.usuario.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    }
    const mascotaUpdated = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(mascotaUpdated)
})

const deleteMascota = asyncHandler(async (req, res) => {
    const mascota = await Mascota.findById(req.params.id)
    if (!mascota) {
        res.status(404)
        throw new Error('Mascota no encontrada')
    }
    if (mascota.usuario.toString() !== req.usuario.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    }
    await mascota.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getMascotas,
    setMascota,
    updateMascota,
    deleteMascota
}
