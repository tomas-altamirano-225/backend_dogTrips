const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Usuario = require('../models/usuarioModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del encabezado
            token = req.headers.authorization.split(' ')[1]

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Obtener el usuario del token
            req.usuario = await Usuario.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('No autorizado')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('No autorizado, no se proporcionó un token')
    }
})

module.exports = { protect }
