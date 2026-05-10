const mongoose = require('mongoose')

const viajeSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: [true, 'Por favor teclea la fecha del viaje']
    },
    hora_salida: {
        type: String,
        required: [true, 'Por favor teclea la hora de salida']
    },
    destino: {
        type: String,
        required: [true, 'Por favor teclea el destino del viaje']
    },
    capacidad_maxima: {
        type: Number,
        required: [true, 'Por favor especifica la capacidad máxima del viaje']
    },
    paseadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paseador'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Viaje', viajeSchema)
