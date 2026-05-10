const express = require('express')
const router = express.Router()
const { getPaseadores, setPaseador, updatePaseador, deletePaseador } = require('../controllers/paseadoresController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPaseadores).post(protect, setPaseador)
router.route('/:id').put(protect, updatePaseador).delete(protect, deletePaseador)

module.exports = router
