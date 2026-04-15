# Guía de Despliegue - BlueTravels

## Versiones Disponibles

### 1. Versión Angular (Recomendada)

#### Requisitos
- Node.js 18+
- Angular CLI 18+

#### Instalación
```bash
npm install
```

#### Desarrollo local
```bash
npm start
# La app estará en http://localhost:4200
```

#### Build para producción
```bash
npm run build
# Output en dist/bluetravels/
```

---

### 2. Versión HTML Legacy

Para pruebas rápidas sin Node.js:

```bash
python3 -m http.server 8000
# Disponible en http://localhost:8000
```

---

## Despliegue en Plataformas Cloud

### GitHub Pages

1. Hacer build:
```bash
npm run build
```

2. Subir contenido de `dist/bluetravels/browser/` a repositorio

3. Configurar GitHub Pages en Settings > Pages

### Netlify

1. Conectar repositorio en Netlify
2. Configurar:
   - Build command: `npm run build`
   - Publish directory: `dist/bluetravels/browser`

3. Deploy

### Vercel

1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Seguir las instrucciones del asistente

---

## Estructura de Producción Angular

```
dist/bluetravels/
└── browser/
    ├── index.html
    ├── main-XXXX.js
    ├── styles-XXXX.css
    └── assets/
```

**Importante:** Configurar el web server para usar `index.html` como fallback para rutas SPA.

---

*Última actualización: 13 de abril de 2026*
