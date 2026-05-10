const express = require('express')
const router = express.Router()
const { getMascotas, setMascota, updateMascota, deleteMascota } = require('../controllers/mascotasController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getMascotas).post(protect, setMascota)
router.route('/:id').put(protect, updateMascota).delete(protect, deleteMascota)

module.exports = router
