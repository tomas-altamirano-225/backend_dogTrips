const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea tu email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea tu password']
    },
    rol: {
        type: String,
        default: 'cliente'
    },
    telefono: {
        type: String,
        required: [true, 'Por favor teclea tu teléfono']
    },
    direccion: {
        calle_numero: {
            type: String,
            required: [true, 'Por favor teclea tu dirección']
        },
        ciudad: {
            type: String,
            required: [true, 'Por favor teclea tu ciudad']
        },
        estado: {
            type: String,
            required: [true, 'Por favor teclea tu estado']
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Usuario', usuarioSchema)
