const mongoose = require('mongoose')

const paquetesSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "Por favor ingrese el título del paquete"]
    },
    precio: {
        type: String,
        required: [true, "Por favor ingrese el precio del paquete"]
    },
    descripcion: {
        type: String,
        required: [true, "Por favor ingrese la descripción del paquete"]
    },
    viajes: {
        type: Number,
        required: [true, "Por favor ingrese el número de viajes"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Paquete', paquetesSchema)
