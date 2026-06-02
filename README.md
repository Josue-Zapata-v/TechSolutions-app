# TechSolutions — Sistema de Gestión de Cursos Tecnológicos

Aplicación web desarrollada con **Next.js 16**, **React 19** y **TypeScript** para gestionar y visualizar cursos tecnológicos. Incluye componentes reutilizables, una interfaz responsive con Tailwind CSS, un dashboard analítico con shadcn/ui y una API REST para la gestión de cursos.

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Clonar e Instalar](#clonar-e-instalar)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Cumplimiento de Requisitos](#cumplimiento-de-requisitos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Scripts Disponibles](#scripts-disponibles)

---

## Descripción General

TechSolutions permite a la empresa gestionar su catálogo de cursos tecnológicos a través de tres vistas principales:

- **Inicio (`/`)** — Landing page con acceso rápido al catálogo y al dashboard.
- **Cursos (`/courses`)** — Galería responsive de cursos con la posibilidad de agregar nuevos y ver detalles individuales.
- **Dashboard (`/dashboard`)** — Panel analítico con métricas de cursos por estado, tabla filtrada por pestañas y exportación de datos en JSON.

Los datos se exponen a través de una API REST interna que soporta listado y registro de cursos.

---

## Tecnologías Utilizadas

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | Next.js | 16.2.7 |
| UI Library | React | 19.2.4 |
| Lenguaje | TypeScript | ^5 |
| Estilos | Tailwind CSS | ^4 |
| Componentes UI | shadcn/ui + @base-ui/react | ^4.10.0 / ^1.5.0 |
| Iconos | Lucide React | ^1.17.0 |
| Variantes CSS | class-variance-authority | ^0.7.1 |
| Utilidades | clsx, tailwind-merge | ^2 / ^3 |

---

## Requisitos Previos

- **Node.js** v18 o superior
- **npm** v9 o superior (o `pnpm` / `yarn`)
- Git

---

## Clonar e Instalar

```bash
# 1. Clonar el repositorio
git clone https://github.com/Josue-Zapata-v/TechSolutions-app.git

# 2. Ingresar al directorio del proyecto
cd TechSolutions-app

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Estructura de Carpetas

```
TechSolutions/
├── app/                          # App Router de Next.js
│   ├── layout.tsx                # Layout raíz (Navbar + fuentes)
│   ├── page.tsx                  # Página de inicio (/)
│   ├── globals.css               # Estilos globales
│   ├── courses/
│   │   └── page.tsx              # Página de cursos (/courses)
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard analítico (/dashboard)
│   └── api/
│       └── courses/
│           └── route.ts          # API REST: GET y POST /api/courses
│
├── components/                   # Componentes reutilizables
│   ├── CourseCard.tsx            # Tarjeta individual de curso
│   ├── StatusBadge.tsx           # Badge de estado y categoría
│   ├── ActionButton.tsx          # Botón con variantes y estados
│   ├── CourseFormModal.tsx       # Modal para agregar cursos
│   ├── CourseDetailModal.tsx     # Modal de detalle de curso
│   ├── Modal.tsx                 # Wrapper genérico de modal
│   ├── Navbar.tsx                # Barra de navegación responsive
│   └── ui/                       # Componentes base de shadcn/ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── tabs.tsx
│
├── lib/
│   ├── data.ts                   # Dataset inicial con 8 cursos de ejemplo
│   └── utils.ts                  # Utilidad cn() para clases de Tailwind
│
├── types/
│   └── course.ts                 # Tipos TypeScript (interface Course)
│
├── public/                       # Assets estáticos
├── next.config.ts                # Configuración de Next.js (dominios de imágenes)
├── components.json               # Configuración de shadcn/ui
├── tsconfig.json                 # Configuración de TypeScript
└── package.json
```

---

## Cumplimiento de Requisitos

### Actividad 1 — Componentes Reutilizables

| Componente | Archivo | Características |
|-----------|---------|----------------|
| `CourseCard` | `components/CourseCard.tsx` | Imagen, nombre, descripción, categoría y botón "Ver Detalles" |
| `StatusBadge` | `components/StatusBadge.tsx` | Estados: **Activo** (verde), **En Progreso** (amarillo), **Finalizado** (gris); variante de categoría (azul) |
| `ActionButton` | `components/ActionButton.tsx` | Variante `primary` (relleno), variante `secondary` (outline), estado `disabled` y estado `loading` con spinner |

### Actividad 2 — Interfaz Responsive `/courses`

- **8 cursos** disponibles en el dataset inicial (supera el mínimo de 6).
- Grid responsive: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`.
- Adaptado a móviles con Navbar hamburguesa para pantallas pequeñas.
- Totalmente construido con **Tailwind CSS**.
- Modal de detalle y modal de formulario para agregar cursos.

### Actividad 3 — Dashboard con shadcn/ui `/dashboard`

Componentes de shadcn/ui utilizados:

| Componente shadcn/ui | Uso en el Dashboard |
|---------------------|---------------------|
| `Card` | Tarjetas de métricas (Total, Activos, En Progreso, Finalizados) |
| `Button` | Botones "Nuevo Curso" y "Exportar JSON" |
| `Badge` | Etiquetas de estado en la tabla de cursos |
| `Tabs` | Filtrado de cursos: Todos / Activos / En Progreso / Finalizados |

El dashboard también muestra la fecha actual en formato español (zona horaria Perú) y permite exportar el listado completo de cursos como archivo JSON.

### Actividad 4 — API Routes

Implementadas en `app/api/courses/route.ts`. Ver sección [Endpoints de la API](#endpoints-de-la-api).

---

## Endpoints de la API

### `GET /api/courses`

Retorna el listado completo de cursos.

**Request:**
```http
GET /api/courses
```

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": 1,
      "nombre": "React con TypeScript",
      "descripcion": "Aprende React desde cero con TypeScript...",
      "categoria": "Frontend",
      "duracion": 48,
      "imagen": "https://picsum.photos/seed/1/400/250",
      "estado": "Activo"
    }
  ]
}
```

---

### `POST /api/courses`

Registra un nuevo curso en el sistema.

**Request:**
```http
POST /api/courses
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "React Avanzado",
  "categoria": "Frontend",
  "duracion": 40
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string | Sí | Nombre del curso |
| `categoria` | string | Sí | Categoría tecnológica |
| `duracion` | number | Sí | Duración en horas (entero positivo) |

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Curso creado exitosamente",
  "data": {
    "id": 9,
    "nombre": "React Avanzado",
    "descripcion": "Curso agregado al sistema",
    "categoria": "Frontend",
    "duracion": 40,
    "imagen": "https://picsum.photos/seed/9/400/250",
    "estado": "Activo"
  }
}
```

**Response `400 Bad Request`** (campos faltantes o duración inválida):
```json
{
  "success": false,
  "error": "Los campos nombre, categoria y duracion son requeridos"
}
```

---

### Prueba rápida con cURL

```bash
# Listar todos los cursos
curl http://localhost:3000/api/courses

# Crear un nuevo curso
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"nombre":"React Avanzado","categoria":"Frontend","duracion":40}'
```

---

## Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo en http://localhost:3000
npm run build    # Build de producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # Análisis estático con ESLint
```

---

## Autor

**Josue Zapata V.**  
Repositorio: [https://github.com/Josue-Zapata-v/TechSolutions-app](https://github.com/Josue-Zapata-v/TechSolutions-app)
