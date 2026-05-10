const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')

const port = process.env.PORT || 5000

// Conectar a la base de datos
connectDB()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Rutas
app.use('/api/usuarios', require('./routes/usuariosRoutes'))
app.use('/api/contactos', require('./routes/contactosRoutes'))
app.use('/api/mascotas', require('./routes/mascotasRoutes'))
app.use('/api/paseadores', require('./routes/paseadoresRoutes'))
app.use('/api/viajes', require('./routes/viajesRoutes'))
app.use('/api/reservas', require('./routes/reservasRoutes'))
app.use('/api/paquetes', require('./routes/paquetesRoutes'))
app.use('/api/paquetes-comprados', require('./routes/paquetesCompradosRoutes'))

// Middleware de manejo de errores
app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.yellow.bold))
