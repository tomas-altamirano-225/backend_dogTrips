const mongoose = require('mongoose')

const paqueteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor teclea el nombre del paquete']
    },
    cantidad_viajes: {
        type: Number,
        required: [true, 'Por favor especifica la cantidad de viajes que incluye el paquete']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor teclea el precio del paquete']
    },
    descuento: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor añade una descripción del paquete']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Paquete', paqueteSchema)
