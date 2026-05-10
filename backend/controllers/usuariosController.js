const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuarioModel')

const registrarUsuario = asyncHandler(async (req, res) => {
    const { nombre, email, password, telefono, direccion } = req.body

    if (
        !nombre ||
        !email ||
        !password ||
        !telefono ||
        !direccion?.calle_numero ||
        !direccion?.ciudad ||
        !direccion?.estado
    ) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    // Verificar si el usuario existe
    const usuarioExiste = await Usuario.findOne({ email })
    if (usuarioExiste) {
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    // Hashear el password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Crear el usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        telefono,
        direccion
    })

    if (usuario) {
        res.status(201).json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
            token: generarToken(usuario._id)
        })
    } else {
        res.status(400)
        throw new Error('Datos inválidos')
    }
})

const loginUsuario = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({ email })

    if (usuario && (await bcrypt.compare(password, usuario.password))) {
        res.status(200).json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
            token: generarToken(usuario._id)
        })
    } else {
        res.status(401)
        throw new Error('Credenciales incorrectas')
    }
})

// Función auxiliar para generar el Token JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registrarUsuario,
    loginUsuario
}
