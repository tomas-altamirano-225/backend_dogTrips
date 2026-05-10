const mongoose = require('mongoose')

const paqueteCompradoSchema = mongoose.Schema({
    fecha_compra: {
        type: Date,
        default: Date.now
    },
    viajes_restantes: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'expirado', 'agotado'],
        default: 'activo'
    },
    fecha_expiracion: {
        type: Date,
        required: [true, 'Por favor especifica la fecha de expiración']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    paquete: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Paquete'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('PaqueteComprado', paqueteCompradoSchema)
