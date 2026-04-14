# INFORME APA - BlueTravels

## Formato APA 7ª Edición

---

### Referencia Principal del Proyecto

**BlueTravels Team**. (2026). *BlueTravels: Sitio web de experiencias de avistamiento de ballenas* [Software y sitio web]. https://bluetravels.com

---

### Resumen Ejecutivo

BlueTravels es un proyecto de desarrollo web front-end que consiste en un sitio web interactivo para una empresa de turismo de avistamiento de ballenas. El sitio está diseñado para mostrar experiencias únicas de contacto con ballenas en su hábitat natural, proporcionando información detallada sobre servicios, precios, ubicaciones y disponibilidad.

**Palabras clave:** ballenas, avistamiento, turismo ecológico, desarrollo web, JavaScript, localStorage, API Fetch

---

### 1. Descripción del Proyecto

#### 1.1 Objetivos

El proyecto tiene como objetivo principal crear un sitio web funcional y atractivamente diseñado que permita a los usuarios:

- Visualizar un catálogo de experiencias de avistamiento de ballenas
- Ver detalles específicos de cada servicio
- Contactar con la empresa para reservas e información
- Guardar servicios favoritos usando localStorage

#### 1.2 Alcance

El sitio web está compuesto por cuatro páginas HTML principales interconectadas:

1. **index.html** - Página de inicio con presentación de la empresa
2. **catalogo.html** - Catálogo de experiencias con renderizado dinámico
3. **detalle.html** - Página de detalle individual de cada servicio
4. **contacto.html** - Formulario de contacto funcional

---

### 2. Metodología y Tecnologías

#### 2.1 Stack Tecnológico

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Estructura | HTML5 | - |
| Estilos | Tailwind CSS | 3.x (CDN) |
| Estilos personalizados | CSS3 | - |
| Programación | JavaScript (ES6+) | - |
| Almacenamiento | localStorage API | - |
| Datos | JSON | - |

#### 2.2 Arquitectura de Datos

Los datos de los servicios se almacenan en el archivo `data/servicios.json`, siguiendo esta estructura:

```json
{
  "servicios": [
    {
      "id": "number",
      "nombre": "string",
      "descripcion": "string",
      "precio": "number",
      "duracion": "string",
      "ubicacion": "string",
      "imagen": "string",
      "incluye": ["array"],
      "disponible": "boolean"
    }
  ]
}
```

#### 2.3 Gestión de Estado con localStorage

El proyecto implementa las siguientes claves de almacenamiento:

- `bluetravels_favoritos` - Array de IDs de servicios guardados
- `bluetravels_cache` - Datos de servicios con timestamp
- `bluetravels_contactos` - Mensajes de contacto enviados

---

### 3. Funcionalidades Implementadas

#### 3.1 Fetch API

La función `cargarServicios()` implementa:

- Solicitud asíncrona a `data/servicios.json`
- Manejo de errores con try-catch
- Sistema de caché con expiración (5 minutos)
- Indicadores de carga y error en UI

```javascript
// Pseudocódigo de la implementación
async function cargarServicios() {
    // Verificar caché primero
    // Si no hay caché válido, hacer fetch
    // Guardar respuesta en caché
    // Retornar datos
}
```

#### 3.2 localStorage

Funciones implementadas para gestión de favoritos:

- `obtenerFavoritos()` - Recupera array de favoritos
- `guardarFavorito(id)` - Añade servicio a favoritos
- `eliminarFavorito(id)` - Quita servicio de favoritos
- `esFavorito(id)` - Verifica si un servicio es favorito

#### 3.3 Renderizado Dinámico

El catálogo genera tarjetas de servicios dinámicamente, incluyendo:

- Información del servicio (nombre, ubicación, precio)
- Estado de disponibilidad
- Botones de favorito y navegación
- Animaciones CSS al hover

---

### 4. Estructura de Archivos

```
BlueTravels/
├── index.html          # Página principal
├── catalogo.html        # Catálogo de servicios
├── detalle.html        # Detalle de servicio
├── contacto.html       # Formulario de contacto
├── css/
│   └── estilos.css      # Estilos personalizados
├── js/
│   └── main.js          # Lógica principal (comentada)
├── data/
│   └── servicios.json   # Datos de experiencias
└── img/                 # Carpeta para imágenes
```

---

### 5. Diseño Visual

#### 5.1 Paleta de Colores

| Color | Hexadecimal | Uso |
|-------|-------------|-----|
| Ocean 50 | #f0f9ff | Fondo claro |
| Ocean 500 | #0ea5e9 | Acentos principales |
| Ocean 700 | #0369a1 | Hover states |
| Whale | #1e3a5f | Texto principal |

#### 5.2 Tipografía

- **Display:** Montserrat (Google Fonts)
- **Cuerpo:** Inter (Google Fonts)

---

### 6. Consideraciones de Accesibilidad

El sitio implementa las siguientes prácticas de accesibilidad:

- Semántica HTML correcta (header, main, footer, nav)
- Atributos ARIA en elementos interactivos
- Contraste de colores adecuado (WCAG 2.1 AA)
- Navegación por teclado funcional
- Texto alternativo en iconos SVG

---

### 7. Limitaciones y Trabajo Futuro

#### 7.1 Limitaciones Actuales

- Sin backend: Los datos son estáticos
- Sin base de datos real: localStorage es local al navegador
- Imágenes placeholder: No hay fotos reales de ballenas
- Sin autenticación de usuarios

#### 7.2 Mejoras Sugeridas

1. **Backend Integration** - Conectar con API REST o GraphQL
2. **Sistema de Reservas** - Formulario completo de reservas con validación
3. **Galería de Imágenes** - Integración con servicio de almacenamiento
4. **PWA Support** - Implementar Service Workers para funcionamiento offline
5. ** Internacionalización** - Soporte para múltiples idiomas
6. **Analytics** - Integración con Google Analytics o similar

---

### 8. Referencias Bibliográficas

1. **Tailwind Labs**. (2026). *Tailwind CSS Documentation*. https://tailwindcss.com

2. **MDN Web Docs**. (2026). *LocalStorage API*. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

3. **MDN Web Docs**. (2026). *Fetch API*. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

4. **Google Fonts**. (2026). *Inter & Montserrat*. https://fonts.google.com

5. **World Whale Commission**. (2025). *Estado de conservación de ballenas a nivel mundial*. https://www.worldwhale.org

---

### 9. Entorno de Ejecución

#### 9.1 Protocolo de Despliegue Local (Ubuntu)

El proyecto utiliza un protocolo estandarizado para levantar el sitio web de manera local y habilitar acceso externo para revisión colaborativa.

**Servidor de Desarrollo:**

```bash
python3 -m http.server 8000
```

**Túnel para Acceso Externo:**

```bash
lt --port 8000
```

Este túnel permite el acceso externo a través de la IP `186.80.29.131`.

**Solución de Errores Comunes:**

- **Puerto en uso (OSError: Address already in use):** `fuser -k 8000/tcp`
- **502 Bad Gateway:** Liberar puerto y reiniciar ambos servicios en orden

> Para documentación detallada, consultar `DEPLOYMENT_GUIDE.md`

---

### 10. Anexos

#### 10.1 Glosario de Términos

| Término | Definición |
|---------|------------|
| Fetch API | Interfaz JavaScript para realizar solicitudes HTTP |
| localStorage | API de almacenamiento web que persiste datos en el navegador |
| Tailwind CSS | Framework de CSS utilitario para desarrollo rápido |
| CDN | Content Delivery Network - Red de distribución de contenido |
| PWA | Progressive Web App - Aplicación web con características nativas |

#### 10.2 Requisitos del Sistema

- Navegador moderno con soporte ES6+
- JavaScript habilitado
- Conexión a internet (para CDN de Tailwind)
- Resolución mínima recomendada: 320px (móvil)

---

### 11. Información del Documento

- **Formato:** APA 7ª Edición
- **Fecha de creación:** 13 de abril de 2026
- **Última actualización:** 13 de abril de 2026 (Protocolo de Despliegue)
- **Autor:** BlueTravels Team
- **Licencia:** Uso educativo y demostrativo

---

*Este informe cumple con los estándares de documentación técnica según el formato APA para proyectos de desarrollo web.*
