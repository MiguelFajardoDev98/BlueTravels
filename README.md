# BlueTravels - Proyecto Final

## Descripción

BlueTravels es una aplicación web para la reserva de experiencias de avistamiento de ballenas, desarrollada con Angular 18 y diseñada siguiendo los principios de turismo responsable y conservación marina.

## Estructura del Proyecto

```
BlueTravels/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/           # Página principal
│   │   │   ├── catalogo/       # Listado de tours con CRUD
│   │   │   ├── detalle/        # Detalle de tour
│   │   │   ├── nosotros/       # Página informativa
│   │   │   └── contacto/       # Formulario de contacto
│   │   ├── services/
│   │   │   └── servicio.service.ts  # Lógica de negocio y CRUD
│   │   ├── models/
│   │   │   └── servicio.model.ts    # Interfaces TypeScript
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── public/                      # Assets estáticos
├── data/                        # Datos JSON (backup)
├── css/                         # Estilos legacy
├── js/                          # Scripts legacy
├── img/                         # Imágenes
├── angular.json
├── tsconfig.json
├── package.json
└── DEPLOYMENT_GUIDE.md
```

## Funcionalidades

### Fase 3 - Diseño
- 5 páginas: Home, Catálogo, Detalle, Nosotros, Contacto
- Hero Section con formulario de búsqueda
- Galería de experiencias destacadas
- Tab Bar persistente en mobile
- Sección de sostenibilidad

### Fase 5 - Prototipo Funcional
- Datos cargados dinámicamente desde localStorage
- Sistema de favoritos con persistencia
- Formulario de contacto con validaciones
- Estructura organizada (/css, /js, /img, /data)

### Fase 7 - Angular y CRUD
- **Componentes Angular standalone**
- **Data binding** (property binding, event binding, two-way binding)
- **Servicios inyectables** con @Injectable
- **Routing** con lazy loading
- **Mini CRUD completo:**
  - Crear nuevos tours
  - Leer tours (listado y detalle)
  - Actualizar tours
  - Eliminar tours

## Instalación y Ejecución

### Requisitos
- Node.js 18+
- Angular CLI 18+

### Instalación
```bash
npm install
```

### Ejecución en desarrollo
```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Build para producción
```bash
npm run build
```

### Legacy (HTML/CSS/JS)
Las versiones legacy en HTML puro siguen disponibles:
- `index.html`, `catalogo.html`, `detalle.html`, `nosotros.html`, `contacto.html`

## Tecnología

- **Framework:** Angular 18 (standalone components)
- **Estilos:** Tailwind CSS (CDN) + CSS custom
- **Almacenamiento:** localStorage
- **TypeScript:** 5.4+
- **Build:** Angular CLI

## Autor

BlueTravels Team - 2026
