const asyncHandler = require('express-async-handler')
const Contacto = require('../models/contactosModel')

const getContactos = asyncHandler(async (req, res) => {
    const contactos = await Contacto.find({})
    res.status(200).json(contactos)
})

const addContacto = asyncHandler(async (req, res) => {
    const { dueno, mascota, estatus } = req.body;

    if (!dueno || !mascota || !dueno.nombreCompleto || !dueno.email || !mascota.nombre) {
        res.status(400)
        throw new Error("Por favor ingrese todos los datos obligatorios del dueño y la mascota")
    }

    const contacto = await Contacto.create({
        dueno,
        mascota,
        estatus: estatus || "Pendiente"
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

const updateContactoEstatus = asyncHandler(async (req, res) => {
    const contacto = await Contacto.findById(req.params.id)
    if (!contacto) {
        res.status(404)
        throw new Error("Contacto no encontrado")
    }

    if (!req.body.estatus) {
        res.status(400)
        throw new Error("Por favor envíe el nuevo estatus")
    }

    contacto.estatus = req.body.estatus;
    const contactoUpdated = await contacto.save();
    
    res.status(200).json(contactoUpdated)
})

module.exports = {
    getContactos,
    addContacto,
    updateContacto,
    deleteContacto,
    updateContactoEstatus
}
