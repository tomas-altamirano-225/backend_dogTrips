const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuarioModel')
const Contacto = require('../models/contactosModel')

const registrarUsuario = asyncHandler(async (req, res) => {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos obligatorios (nombre, email, password)')
    }

    // Verificar si tiene un Meet & Greet aprobado
    const contacto = await Contacto.findOne({ 'dueno.email': email })
    if (!contacto || contacto.estatus !== 'Aprobado') {
        res.status(401)
        throw new Error('Tu solicitud del Meet & Greet aún no ha sido aprobada')
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

    // Crear el usuario extrayendo info adicional del contacto
    const usuario = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        telefono: contacto.dueno.telefono,
        direccion: {
            calle_numero: contacto.dueno.direccion.calleNumero,
            ciudad: contacto.dueno.direccion.ciudad,
            estado: contacto.dueno.direccion.estado
        }
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

const getUsuarios = asyncHandler(async (req, res) => {
    // Solo devolvemos usuarios excluyendo su password
    const usuarios = await Usuario.find({}).select('-password')
    res.status(200).json(usuarios)
})

module.exports = {
    registrarUsuario,
    loginUsuario,
    getUsuarios
}
