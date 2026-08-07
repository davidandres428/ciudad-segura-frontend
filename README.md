# Ciudad Segura — Front-end (React)

Front-end del proyecto formativo **Ciudad Segura**, desarrollado con **React + Vite**,
**React Router**, **Hooks** (`useState`, `useEffect`, `useNavigate`, `useContext`),
**Axios** para el consumo del back-end (Spring Boot) y **Tailwind CSS** para los estilos.

Evidencia: `GA7-220501096-AA4-EV03`

## Requisitos previos

- Node.js 18 o superior
- El back-end de Ciudad Segura corriendo (por defecto en `http://localhost:8080`)

## Instalacion

```bash
npm install
```

## Configuracion de la API

Copia el archivo de ejemplo y ajusta la URL del backend si es necesario:

```bash
cp .env.example .env
```

```
VITE_API_URL=http://localhost:8080/api
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Generar build de produccion

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── FiltroReportes.jsx
│   ├── TablaReportes.jsx
│   ├── TarjetaReporte.jsx
│   ├── ModalDetalleReporte.jsx
│   ├── FormularioReporte.jsx
│   └── RutaProtegida.jsx
├── pages/               # Pantallas completas (rutas)
│   ├── Login.jsx
│   ├── Registro.jsx
│   └── Home.jsx
├── context/
│   └── AuthContext.jsx  # Estado global del usuario autenticado
├── services/            # Comunicacion con la API REST
│   ├── api.js
│   ├── usuarioService.js
│   └── reporteService.js
├── App.jsx              # Enrutador principal
└── main.jsx             # Punto de entrada
```

## Funcionalidades implementadas

- Registro e inicio de sesion de ciudadanos (`/api/usuarios`)
- Rutas protegidas: el panel de reportes solo es accesible con sesion iniciada
- Listado de reportes con filtro por categoria y estado
- Creacion, edicion y eliminacion de reportes (`/api/reportes`)
- Actualizacion del estado de un reporte (pendiente -> en_revision -> resuelto)
- Navegacion entre pantallas con React Router (`useNavigate`)

## Documentos relacionados

Ver `EV01_Taller_React` (fundamentos teoricos) y `EV02_Componentes_CiudadSegura`
(diseno y justificacion de componentes) que dieron origen a esta implementacion.

## Repositorio

Enlace del repositorio: _completar con la URL de tu repositorio en GitHub_
