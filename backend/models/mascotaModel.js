const mongoose = require('mongoose')

const mascotaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor teclea el nombre de la mascota']
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, 'Por favor teclea la fecha de nacimiento']
    },
    edad: {
        type: Number
    },
    genero: {
        type: String,
        required: [true, 'Por favor teclea el género de la mascota']
    },
    raza: {
        type: String,
        required: [true, 'Por favor teclea la raza']
    },
    peso: {
        type: Number,
        required: [true, 'Por favor teclea el peso en kg']
    },
    tamaño: {
        type: String,
        required: [true, 'Por favor especifica el tamaño (Pequeño, Mediano, Grande)']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Mascota', mascotaSchema)
