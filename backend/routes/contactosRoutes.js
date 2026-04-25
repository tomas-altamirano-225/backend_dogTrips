const express = require('express')
const router = express.Router()
const { getContactos, addContacto, updateContacto, deleteContacto } = require('../controllers/contactosController')

router.route('/').get(getContactos).post(addContacto)
router.route('/:id').put(updateContacto).delete(deleteContacto)

module.exports = router
