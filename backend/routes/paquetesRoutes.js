const express = require('express')
const router = express.Router()
const { getPaquetes, setPaquete, updatePaquete, deletePaquete } = require('../controllers/paquetesController')
const { protect } = require('../middleware/authMiddleware')

// GET es público para mostrar paquetes en la web, los demás son protegidos
router.route('/').get(getPaquetes).post(protect, setPaquete)
router.route('/:id').put(protect, updatePaquete).delete(protect, deletePaquete)

module.exports = router
