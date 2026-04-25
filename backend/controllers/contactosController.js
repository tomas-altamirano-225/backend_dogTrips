const asyncHandler = require('express-async-handler')
const Contacto = require('../models/contactosModel')

const getContactos = asyncHandler(async (req, res) => {
    const contactos = await Contacto.find({})
    res.status(200).json(contactos)
})

const addContacto = asyncHandler(async (req, res) => {
    if (!req.body.nombre || !req.body.email || !req.body.nombre_perrito) {
        res.status(400)
        throw new Error("Por favor ingrese el nombre, email y nombre del perrito")
    }

    const contacto = await Contacto.create({
        nombre: req.body.nombre,
        email: req.body.email,
        nombre_perrito: req.body.nombre_perrito,
        estatus: req.body.estatus || "Pendiente"
    })

    if (contacto) {
        res.status(201).json(contacto)
    } else {
        res.status(500)
        throw new Error("Error al crear el contacto")
    }
})

const updateContacto = asyncHandler(async (req, res) => {
    const contacto = await Contacto.findById(req.params.id)
    if (!contacto) {
        res.status(404)
        throw new Error("Contacto no encontrado")
    }

    const contactoUpdated = await Contacto.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(contactoUpdated)
})

const deleteContacto = asyncHandler(async (req, res) => {
    const contacto = await Contacto.findById(req.params.id)
    if (!contacto) {
        res.status(404)
        throw new Error("Contacto no encontrado")
    }

    await Contacto.deleteOne(contacto)
    res.status(200).json({ "Mensaje": `Contacto ${req.params.id} eliminado` })
})

module.exports = {
    getContactos,
    addContacto,
    updateContacto,
    deleteContacto
}
