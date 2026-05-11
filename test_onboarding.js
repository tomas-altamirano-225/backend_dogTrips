const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const baseUrl = 'http://127.0.0.1:5000/api';

async function runTests() {
    console.log("=== INICIANDO PRUEBA DE FLUJO DE ONBOARDING ===");
    
    // 1. Conectar a la DB y crear Admin directamente
    await mongoose.connect(process.env.MONGO_URI);
    const Usuario = require('./backend/models/usuarioModel');
    
    const adminEmail = `admin_test_${Date.now()}@test.com`;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash('admin123', salt);
    
    const adminUser = await Usuario.create({
        nombre: 'Admin Supremo',
        email: adminEmail,
        password: hashedPass,
        rol: 'admin',
        telefono: '0000000000',
        direccion: {
            calle_numero: 'Av. Admin 1',
            ciudad: 'AdminCity',
            estado: 'AdminState'
        }
    });

    // 2. Iniciar sesión como Admin
    const loginRes = await fetch(`${baseUrl}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: 'admin123' })
    });
    const adminData = await loginRes.json();
    const adminToken = adminData.token;
    console.log("Admin logueado con éxito. Token obtenido:", !!adminToken);

    // 3. Crear un nuevo Contacto (Público)
    const testEmail = `lead_${Date.now()}@test.com`;
    console.log(`\n=== Creando Lead: ${testEmail} ===`);
    const contactoRes = await fetch(`${baseUrl}/contactos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dueno: {
                nombreCompleto: "Nuevo Cliente",
                email: testEmail,
                telefono: "555-1234",
                direccion: {
                    calleNumero: "Calle Cliente 12",
                    ciudad: "Ciudad Perro",
                    estado: "Estado Canino"
                }
            },
            mascota: {
                nombre: "Rex",
                raza: "Pastor Alemán",
                genero: "Macho",
                fechaNacimiento: "2021-05-10"
            }
        })
    });
    const contactoData = await contactoRes.json();
    console.log("Lead creado:", contactoData._id, "- Estatus:", contactoData.estatus);

    // 4. Intentar registrar (Debería fallar porque estatus = Pendiente)
    console.log("\n=== Intentando registrar sin aprobación ===");
    const regFailRes = await fetch(`${baseUrl}/usuarios/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: "Nuevo Cliente", email: testEmail, password: "password123" })
    });
    console.log("Respuesta (esperado 401):", regFailRes.status, await regFailRes.text());

    // 5. Admin aprueba el contacto
    console.log("\n=== Admin aprueba el Lead ===");
    const approveRes = await fetch(`${baseUrl}/contactos/${contactoData._id}/estatus`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ estatus: 'Aprobado' })
    });
    const approveData = await approveRes.json();
    console.log("Lead Aprobado:", approveData.estatus);

    // 6. Registrar de nuevo (Debería ser exitoso)
    console.log("\n=== Intentando registrar DESPUÉS de la aprobación ===");
    const regSuccessRes = await fetch(`${baseUrl}/usuarios/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: "Nuevo Cliente", email: testEmail, password: "password123" })
    });
    console.log("Respuesta (esperado 201):", regSuccessRes.status);
    const newUserData = await regSuccessRes.json();
    console.log("Datos del nuevo usuario (verifica si extrajo telefono/direccion):", newUserData.telefono, newUserData.direccion);

    mongoose.connection.close();
    console.log("\n=== PRUEBA FINALIZADA ===");
}

runTests();
