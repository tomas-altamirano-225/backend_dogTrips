const mongoose = require('mongoose')

const contactosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre del contacto"]
    },
    email: {
        type: String,
        required: [true, "Por favor ingrese el correo electrónico del contacto"]
    },
    nombre_perrito: {
        type: String,
        required: [true, "Por favor ingrese el nombre del perrito"]
    },
    estatus: {
        type: String,
        default: "Pendiente"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contacto', contactosSchema)
