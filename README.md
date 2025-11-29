# Proyecto Final
Lisandro Adolfo Cantarero Girón - 20201001693
Angel Oved Martinez Galindo - 20211930086

# SubTracker

SubTracker es una aplicación para llevar el control de tus suscripciones y ver cuánto gastas al mes.
Puedes agregar, editar o eliminar tus suscripciones, y los datos se guardan automáticamente aunque cierres la página.

## Estructura del proyecto

* **07-Proyecto** → Frontend (Vue 3 + TypeScript + Tailwind)
* **07-Proyecto-api** → Backend (Express + TypeScript + Prisma + SQLite)

## Requisitos

* Node.js
* npm

## Cómo levantar el proyecto

### 1️⃣ Backend (API con SQLite)

1. Abre una terminal en `07-Proyecto-api`:

```bash
cd 07-Proyecto-api
npm install
```

2. Configura el `.env`:

```
DATABASE_URL="file:./prisma/dev.db"
PORT=4000
```

3. Crea la base de datos y aplica la migración:

```bash
npx prisma migrate dev --name init
```

4. Levanta el backend:

```bash
npm run dev
```

* El API quedará corriendo en `http://localhost:4000`.

---

### 2️⃣ Frontend (Vue)

1. Abre otra terminal en `07-Proyecto`:

```bash
cd 07-Proyecto
npm install
```

2. Configura el `.env` para que apunte al backend:

```
VITE_API_URL=http://localhost:4000
```

3. Levanta el frontend:

```bash
npm run dev
```

* Abre la URL que te muestre Vite (por defecto `http://localhost:5173`) en tu navegador.

---

## Funcionalidades

* Crear, editar y eliminar suscripciones.
* Mostrar todas las suscripciones existentes.
* Calcular automáticamente el **gasto mensual total** normalizado.
* Persistencia de datos usando SQLite, así que los datos permanecen aunque recargues la página o reinicies el backend.

---

