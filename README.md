# DogTrips - Backend API

## Descripción
DogTrips Backend es una API RESTful construida con Node.js y Express que sirve como núcleo lógico y de gestión de datos para la plataforma DogTrips. Esta API permite la administración segura de usuarios (dueños), mascotas, servicios de paseadores, reservaciones de viajes y paquetes promocionales.

## Tecnologías Utilizadas
- **Node.js** & **Express.js**: Entorno de ejecución y framework para la construcción de la API REST.
- **MongoDB** & **Mongoose**: Base de datos NoSQL y ODM (Object Data Modeling) para la estructuración y validación de datos.
- **JSON Web Tokens (JWT)**: Para la autenticación basada en tokens, autorización y persistencia segura de sesiones.
- **bcrypt**: Para el encriptamiento seguro de contraseñas de los usuarios.

## Justificación de la Arquitectura NoSQL Basada en Referencias
Para modelar la complejidad del negocio de DogTrips en MongoDB, hemos optado por una **arquitectura de esquema basada en referencias** (utilizando `ObjectId` y el método `populate()` de Mongoose) en lugar de utilizar documentos embebidos. Esta decisión técnica se sustenta en:

1. **Independencia del Ciclo de Vida**: Entidades como *Mascotas*, *Paseadores* y *Viajes* existen por sí mismas y son consultadas en contextos distintos. Por ejemplo, un Paseador puede estar asignado a múltiples Viajes, y una Mascota puede tener un historial de múltiples Reservas.
2. **Prevención de Redundancia y Anomalías**: Si decidiéramos embeber los datos de los Paseadores dentro de cada Viaje, cualquier cambio en los datos de un Paseador nos forzaría a actualizar múltiples documentos, incrementando el riesgo de inconsistencias.
3. **Límites de Tamaño de Documentos**: Las relaciones en este sistema (ej. múltiples Reservas por Viaje, o un historial extenso de Reservas por Usuario) pueden crecer indefinidamente a lo largo del tiempo. Las referencias evitan el riesgo de alcanzar el límite máximo por documento en MongoDB (16 MB).
4. **Escalabilidad y Flexibilidad**: Esta aproximación nos permite consultar la base de datos de manera relacional cuando es necesario a través de `populate()`, manteniendo a la vez el esquema horizontalmente escalable típico de NoSQL.

## Instrucciones de Instalación

Sigue estos pasos para configurar el entorno local del servidor:

1. **Requisitos Previos**:
   - [Node.js](https://nodejs.org/) instalado.
   - Acceso a un cluster de [MongoDB Atlas](https://www.mongodb.com/atlas/database) o MongoDB ejecutándose localmente.

2. **Instalar Dependencias**:
   En la raíz de la carpeta `backend_dogTrips`, ejecuta:
   ```bash
   npm install
   ```

3. **Variables de Entorno**:
   Crea un archivo `.env` en la raíz del backend con al menos las siguientes variables (ajustando a tus configuraciones):
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/dogtrips?retryWrites=true&w=majority
   JWT_SECRET=tu_secreto_super_seguro
   ```

4. **Ejecutar el Servidor**:
   Para entorno de desarrollo (con recarga automática):
   ```bash
   npm run server
   ```
   *Nota: Asegúrate de tener configurado `nodemon` en los scripts de tu `package.json` para usar el comando `server`.*
   O para entorno de producción:
   ```bash
   npm start
   ```
