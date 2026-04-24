const express = require('express')
const router = express.Router()
const { getPaquetes, addPaquete, updatePaquete, deletePaquete } = require('../controllers/paquetesController')

router.route('/').get(getPaquetes).post(addPaquete)
router.route('/:id').put(updatePaquete).delete(deletePaquete)

module.exports = router
