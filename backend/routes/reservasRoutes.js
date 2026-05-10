const express = require('express')
const router = express.Router()
const { getReservas, setReserva, updateReserva, deleteReserva } = require('../controllers/reservasController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReservas).post(protect, setReserva)
router.route('/:id').put(protect, updateReserva).delete(protect, deleteReserva)

module.exports = router
