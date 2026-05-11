const asyncHandler = require('express-async-handler')
const PaqueteComprado = require('../models/paqueteCompradoModel')

const getPaquetesComprados = asyncHandler(async (req, res) => {
    let paquetesComprados;
    if (req.usuario.rol === 'admin') {
        paquetesComprados = await PaqueteComprado.find()
            .populate('usuario', 'nombre email')
            .populate('paquete', 'titulo descripcion');
    } else {
        paquetesComprados = await PaqueteComprado.find({ usuario: req.usuario.id })
            .populate('usuario', 'nombre email')
            .populate('paquete', 'titulo descripcion');
    }
    res.status(200).json(paquetesComprados)
})

const setPaqueteComprado = asyncHandler(async (req, res) => {
    if (!req.body.viajes_restantes || !req.body.fecha_expiracion || !req.body.paquete) {
        res.status(400)
        throw new Error('Por favor teclea todos los campos obligatorios del paquete comprado')
    }
    const paqueteComprado = await PaqueteComprado.create({
        ...req.body,
        usuario: req.usuario.id
    })
    res.status(201).json(paqueteComprado)
})

const updatePaqueteComprado = asyncHandler(async (req, res) => {
    const paqueteComprado = await PaqueteComprado.findById(req.params.id)
    if (!paqueteComprado) {
        res.status(404)
        throw new Error('Paquete comprado no encontrado')
    }
    if (paqueteComprado.usuario.toString() !== req.usuario.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    }
    const paqueteCompradoUpdated = await PaqueteComprado.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(paqueteCompradoUpdated)
})

const deletePaqueteComprado = asyncHandler(async (req, res) => {
    const paqueteComprado = await PaqueteComprado.findById(req.params.id)
    if (!paqueteComprado) {
        res.status(404)
        throw new Error('Paquete comprado no encontrado')
    }
    if (paqueteComprado.usuario.toString() !== req.usuario.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    }
    await paqueteComprado.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPaquetesComprados,
    setPaqueteComprado,
    updatePaqueteComprado,
    deletePaqueteComprado
}
