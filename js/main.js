/* ================================================
   BlueTravels - Archivo JavaScript Principal v2.0
   ================================================
   Rediseñado para compatibilidad con nuevos mockups
   - Fetch API para cargar datos JSON
   - localStorage para persistencia de favoritos
   - Renderizado dinámico de servicios
   
   Autor: BlueTravels Team
   Versión: 2.0.0
   Fecha: 2026
================================================ */

/* ================================================
   CONFIGURACIÓN GLOBAL
   ================================================ */
const CONFIG = {
    API_URL: 'data/servicios.json',
    STORAGE_KEY: 'bluetravels_favoritos',
    CACHE_DURATION: 5 * 60 * 1000,
    CACHE_KEY: 'bluetravels_cache'
};

/* ================================================
   UTILIDADES
   ================================================ */

/**
 * Formatea un precio en formato de moneda USD
 * @param {number} precio - Precio a formatear
 * @returns {string} Precio formateado
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(precio);
}

/**
 * Obtiene un parámetro de la URL
 * @param {string} param - Nombre del parámetro
 * @returns {string|null} Valor del parámetro
 */
function obtenerParametroURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Guarda datos en localStorage con timestamp
 * @param {string} key - Clave
 * @param {any} data - Datos
 */
function guardarEnCache(key, data) {
    const cacheData = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(cacheData));
}

/**
 * Obtiene datos del caché si no han expirado
 * @param {string} key - Clave
 * @param {number} duration - Duración en ms
 * @returns {any|null} Datos o null
 */
function obtenerDelCache(key, duration) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    if (Date.now() - cacheData.timestamp > duration) {
        localStorage.removeItem(key);
        return null;
    }
    return cacheData.data;
}

/* ================================================
   GESTIÓN DE FAVORITOS (localStorage)
   ================================================ */

function obtenerFavoritos() {
    const favoritos = localStorage.getItem(CONFIG.STORAGE_KEY);
    return favoritos ? JSON.parse(favoritos) : [];
}

function guardarFavorito(servicioId) {
    const favoritos = obtenerFavoritos();
    if (!favoritos.includes(servicioId)) {
        favoritos.push(servicioId);
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(favoritos));
    }
}

function eliminarFavorito(servicioId) {
    let favoritos = obtenerFavoritos();
    favoritos = favoritos.filter(id => id !== servicioId);
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(favoritos));
}

function esFavorito(servicioId) {
    return obtenerFavoritos().includes(servicioId);
}

function toggleFavorito(servicioId) {
    if (esFavorito(servicioId)) {
        eliminarFavorito(servicioId);
    } else {
        guardarFavorito(servicioId);
    }
}

/* ================================================
   FETCH API - CARGA DE DATOS
   ================================================ */

async function cargarServicios() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('errorContainer');
    
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (errorEl) errorEl.classList.add('hidden');
    
    try {
        let servicios = obtenerDelCache(CONFIG.CACHE_KEY, CONFIG.CACHE_DURATION);
        
        if (!servicios) {
            const respuesta = await fetch(CONFIG.API_URL);
            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
            
            const datos = await respuesta.json();
            servicios = datos.servicios;
            guardarEnCache(CONFIG.CACHE_KEY, servicios);
        }
        
        if (loadingEl) loadingEl.classList.add('hidden');
        return servicios;
        
    } catch (error) {
        console.error('Error al cargar servicios:', error);
        
        if (loadingEl) loadingEl.classList.add('hidden');
        if (errorEl) {
            errorEl.classList.remove('hidden');
            const errorMsg = document.getElementById('errorMessage');
            if (errorMsg) errorMsg.textContent = 'No se pudieron cargar los servicios.';
        }
        return [];
    }
}

/* ================================================
   RENDERIZADO DE TARJETAS
   ================================================ */

/**
 * Genera el HTML para una tarjeta de servicio
 * Compatible con el nuevo diseño (border-radius 2rem)
 * @param {Object} servicio - Datos del servicio
 * @returns {string} HTML de la tarjeta
 */
function generarTarjetaHTML(servicio) {
    const disponible = servicio.disponible;
    const badgeClass = disponible ? 'badge-success' : 'badge-error';
    const badgeText = disponible ? 'Disponible' : 'Agotado';
    const btnClass = disponible 
        ? 'btn-primary' 
        : 'btn-secondary cursor-not-allowed opacity-50';
    const linkAttr = disponible ? '' : 'onclick="event.preventDefault()"';
    const imagenSrc = servicio.imagen || '';
    
    return `
        <article class="service-card">
            <div class="service-card-image">
                ${imagenSrc ? `<img src="${imagenSrc}" alt="${servicio.nombre}" onerror="this.style.display='none'">` : ''}
                <span class="badge ${badgeClass} service-card-badge">${badgeText}</span>
            </div>
            <div class="service-card-content">
                <h3 class="service-card-title">${servicio.nombre}</h3>
                <p class="service-card-location">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    ${servicio.ubicacion}
                </p>
                <p class="service-card-desc">${servicio.descripcion.substring(0, 80)}...</p>
                <div class="flex items-center justify-between mt-3">
                    <div class="service-card-price">
                        ${formatearPrecio(servicio.precio)}
                        <span>/ persona</span>
                    </div>
                    <a 
                        href="detalle.html?id=${servicio.id}" 
                        class="${btnClass}" 
                        style="padding: 0.5rem 1rem; font-size: 0.875rem;" 
                        ${linkAttr}
                    >
                        Ver
                    </a>
                </div>
            </div>
        </article>
    `;
}

/**
 * Alias para compatibilidad con el home
 */
function generarTarjetaServicio(servicio) {
    return generarTarjetaHTML(servicio);
}

/* ================================================
   RENDERIZADO DE FAVORITOS
   ================================================ */

function renderizarFavoritos() {
    const container = document.getElementById('favoritosContainer');
    if (!container) return;
    
    const favoritos = obtenerFavoritos();
    
    if (favoritos.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-sm italic">No hay servicios guardados</p>';
        return;
    }
    
    const servicios = obtenerDelCache(CONFIG.CACHE_KEY, Infinity);
    if (!servicios) {
        container.innerHTML = '<p class="text-gray-400 text-sm">Cargando...</p>';
        return;
    }
    
    container.innerHTML = favoritos.map(id => {
        const servicio = servicios.find(s => s.id === id);
        if (!servicio) return '';
        
        return `
            <div class="card p-3 flex items-center justify-between">
                <span class="text-sm font-medium truncate flex-1">${servicio.nombre}</span>
                <button onclick="quitarFavorito(${id})" class="text-red-500 hover:text-red-700 ml-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
}

function quitarFavorito(id) {
    eliminarFavorito(id);
    renderizarFavoritos();
}

/* ================================================
   PÁGINA DE DETALLE
   ================================================ */

function mostrarErrorDetalle(mensaje) {
    const loadingEl = document.getElementById('loading');
    const containerEl = document.getElementById('detalleContainer');
    const errorEl = document.getElementById('errorContainer');
    
    if (loadingEl) loadingEl.classList.add('hidden');
    if (containerEl) containerEl.classList.add('hidden');
    if (errorEl) {
        errorEl.classList.remove('hidden');
        const errorMsg = document.getElementById('errorMessage');
        if (errorMsg) errorMsg.textContent = mensaje;
    }
}

/* ================================================
   MENÚ MÓVIL
   ================================================ */

function inicializarMenuMovil() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    const enlaces = mobileMenu.querySelectorAll('a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

/* ================================================
   INICIALIZACIÓN
   ================================================ */

function inicializar() {
    inicializarMenuMovil();
    
    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    
    // Las páginas ahora usan scripts inline para su inicialización
}

/* ================================================
   EXPORTAR FUNCIONES AL GLOBAL SCOPE
   ================================================ */
window.toggleFavorito = toggleFavorito;
window.quitarFavorito = quitarFavorito;
window.cargarServicios = cargarServicios;
window.formatearPrecio = formatearPrecio;
window.generarTarjetaHTML = generarTarjetaHTML;
window.generarTarjetaServicio = generarTarjetaServicio;
window.obtenerParametroURL = obtenerParametroURL;
window.guardarFavorito = guardarFavorito;
window.esFavorito = esFavorito;
window.renderizarFavoritos = renderizarFavoritos;
window.mostrarErrorDetalle = mostrarErrorDetalle;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);
