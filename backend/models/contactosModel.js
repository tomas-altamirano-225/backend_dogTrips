const mongoose = require('mongoose')

const contactosSchema = mongoose.Schema({
    dueno: {
        nombreCompleto: { type: String, required: [true, "Por favor ingrese el nombre del dueño"] },
        email: { type: String, required: [true, "Por favor ingrese el correo electrónico"] },
        telefono: { type: String, required: [true, "Por favor ingrese el teléfono"] },
        direccion: {
            calleNumero: { type: String, required: true },
            ciudad: { type: String, required: true },
            estado: { type: String, required: true }
        }
    },
    mascota: {
        nombre: { type: String, required: [true, "Por favor ingrese el nombre de la mascota"] },
        raza: { type: String, required: true },
        genero: { type: String, required: true },
        fechaNacimiento: { type: Date, required: true }
    },
    estatus: {
        type: String,
        default: "Pendiente"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Contacto', contactosSchema)
