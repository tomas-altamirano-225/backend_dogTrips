const express = require('express')
const router = express.Router()
const { getViajes, setViaje, updateViaje, deleteViaje } = require('../controllers/viajesController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getViajes).post(protect, setViaje)
router.route('/:id').put(protect, updateViaje).delete(protect, deleteViaje)

module.exports = router
