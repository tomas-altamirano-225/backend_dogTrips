const mongoose = require('mongoose')

const reservaSchema = mongoose.Schema({
    fecha_reserva: {
        type: Date,
        default: Date.now
    },
    estado_pago: {
        type: String,
        enum: ['pendiente', 'pagado', 'fallido'],
        default: 'pendiente'
    },
    estado: {
        type: String,
        enum: ['activa', 'cancelada', 'completada'],
        default: 'activa'
    },
    tipo: {
        type: String,
        required: [true, 'Por favor especifica el tipo de reserva (paquete, individual)']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mascota'
    },
    viaje: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Viaje'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Reserva', reservaSchema)
