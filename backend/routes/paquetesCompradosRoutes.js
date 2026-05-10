const express = require('express')
const router = express.Router()
const { getPaquetesComprados, setPaqueteComprado, updatePaqueteComprado, deletePaqueteComprado } = require('../controllers/paquetesCompradosController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPaquetesComprados).post(protect, setPaqueteComprado)
router.route('/:id').put(protect, updatePaqueteComprado).delete(protect, deletePaqueteComprado)

module.exports = router
