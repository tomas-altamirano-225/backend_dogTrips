const asyncHandler = require('express-async-handler')
const Reserva = require('../models/reservaModel')

const getReservas = asyncHandler(async (req, res) => {
    const reservas = await Reserva.find({ usuario: req.usuario.id })
        .populate('usuario')
        .populate('mascota')
        .populate({
            path: 'viaje',
            populate: { path: 'paseadores' }
        })
    res.status(200).json(reservas)
})

const setReserva = asyncHandler(async (req, res) => {
    if (!req.body.tipo || !req.body.mascota || !req.body.viaje) {
        res.status(400)
        throw new Error('Por favor teclea todos los campos obligatorios de la reserva')
    }
    const reserva = await Reserva.create({
        ...req.body,
        usuario: req.usuario.id
    })
    res.status(201).json(reserva)
})

const updateReserva = asyncHandler(async (req, res) => {
    const reserva = await Reserva.findById(req.params.id)
    if (!reserva) {
        res.status(404)
        throw new Error('Reserva no encontrada')
    }
    if (reserva.usuario.toString() !== req.usuario.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    }
    const reservaUpdated = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(reservaUpdated)
})

const deleteReserva = asyncHandler(async (req, res) => {
    const reserva = await Reserva.findById(req.params.id)
    if (!reserva) {
        res.status(404)
        throw new Error('Reserva no encontrada')
    }
    if (reserva.usuario.toString() !== req.usuario.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    }
    await reserva.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getReservas,
    setReserva,
    updateReserva,
    deleteReserva
}
