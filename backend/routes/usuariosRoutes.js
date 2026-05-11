const express = require('express')
const router = express.Router()
const { registrarUsuario, loginUsuario, getUsuarios } = require('../controllers/usuariosController')
const { protect } = require('../middleware/authMiddleware')

router.post('/registrar', registrarUsuario)
router.post('/login', loginUsuario)
router.get('/', protect, getUsuarios)

module.exports = router
