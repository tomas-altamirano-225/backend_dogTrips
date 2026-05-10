const mongoose = require('mongoose')

const paseadorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor teclea el nombre del paseador']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea el email del paseador'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'Por favor teclea el teléfono del paseador']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Paseador', paseadorSchema)
