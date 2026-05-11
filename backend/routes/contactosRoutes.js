const express = require('express')
const router = express.Router()
const { getContactos, addContacto, updateContacto, deleteContacto, updateContactoEstatus } = require('../controllers/contactosController')
const { protect } = require('../middleware/authMiddleware')

// Protegemos el GET para que solo el admin logueado pueda ver los leads
router.route('/').get(protect, getContactos).post(addContacto)
router.route('/:id').put(protect, updateContacto).delete(protect, deleteContacto)
router.route('/:id/estatus').patch(protect, updateContactoEstatus)

module.exports = router
