SubTracker

SubTracker es una aplicación para llevar el control de tus suscripciones y ver cuánto gastas al mes.
Puedes agregar, editar o eliminar tus suscripciones, y los datos se guardan automáticamente aunque cierres la página.

Estructura del proyecto

07-Proyecto → Frontend (Vue 3 + TypeScript + Tailwind)

07-Proyecto-api → Backend (Express + TypeScript + Prisma + SQLite)

Requisitos

Node.js (v18 o superior recomendado)

npm

Cómo levantar el proyecto
1️⃣ Backend (API con SQLite)

Abre una terminal en 07-Proyecto-api:

cd 07-Proyecto-api
npm install


Configura el .env (ya incluido, pero revisa la ruta si cambiaste algo):

DATABASE_URL="file:./prisma/dev.db"
PORT=4000


Crea la base de datos y aplica la migración:

npx prisma migrate dev --name init


Levanta el backend:

npm run dev


El API quedará corriendo en http://localhost:4000.

2️⃣ Frontend (Vue)

Abre otra terminal en 07-Proyecto:

cd 07-Proyecto
npm install


Configura el .env para que apunte al backend:

VITE_API_URL=http://localhost:4000


Levanta el frontend:

npm run dev


Abre la URL que te muestre Vite (por defecto http://localhost:5173) en tu navegador.

Funcionalidades

Crear, editar y eliminar suscripciones.

Mostrar todas las suscripciones existentes.

Calcular automáticamente el gasto mensual total normalizado.

Persistencia de datos usando SQLite, así que los datos permanecen aunque recargues la página o reinicies el backend.
