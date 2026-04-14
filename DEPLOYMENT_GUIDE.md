# Guía de Despliegue Local - BlueTravels

## Protocolo de Despliegue Estandarizado para Ubuntu

---

## 1. Entorno de Ejecución

### 1.1 Requisitos Previos

- Python 3 instalado (`python3 --version`)
- Node.js (opcional, solo si se usa npm para localtunnel)
- npm (para instalar localtunnel)
- Navegador web moderno

### 1.2 Instalación de Dependencias

```bash
# Instalar localtunnel globalmente
npm install -g localtunnel
```

---

## 2. Pasos de Despliegue

### 2.1 Iniciar el Servidor Local

Desde el directorio del proyecto (`BlueTravels/`):

```bash
python3 -m http.server 8000
```

El servidor estará disponible en: `http://localhost:8000`

### 2.2 Habilitar Acceso Externo (Túnel)

En una **nueva terminal**, ejecutar:

```bash
lt --port 8000
```

Esto generará una URL pública temporal (formato: `https://xxxx.loca.lt`) que podrás compartir con tus compañeros.

**IP del túnel asignada:** `186.80.29.131`

### 2.3 Acceso desde其他 Dispositivos/Compañeros

1. Abrir la URL del túnel proporcionada por localtunnel
2. Ingresar la IP del túnel cuando lo solicite: `186.80.29.131`
3. Navegar por el sitio normalmente

---

## 3. Solución de Errores

### 3.1 Error: Puerto en Uso (OSError: Address already in use)

Si el puerto 8000 está ocupado:

```bash
fuser -k 8000/tcp
```

Luego reiniciar el servidor:

```bash
python3 -m http.server 8000
```

### 3.2 Error: 502 Bad Gateway

Este error indica que el túnel se desconectó del servidor local. Solución:

1. Verificar que el servidor local esté corriendo
2. Matar cualquier proceso en el puerto 8000:
   ```bash
   fuser -k 8000/tcp
   ```
3. Reiniciar ambos servicios en orden:
   ```bash
   # Terminal 1: Servidor
   python3 -m http.server 8000
   
   # Terminal 2: Túnel
   lt --port 8000
   ```

---

## 4. Comandos Resumen

| Acción | Comando |
|--------|---------|
| Iniciar servidor | `python3 -m http.server 8000` |
| Crear túnel | `lt --port 8000` |
| Liberar puerto | `fuser -k 8000/tcp` |

---

## 5. Estructura de Terminales

```
┌─────────────────────────────────┐
│ Terminal 1 (Servidor)          │
│ $ python3 -m http.server 8000  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Terminal 2 (Túnel)             │
│ $ lt --port 8000               │
│ → URL: https://xxxx.loca.lt    │
└─────────────────────────────────┘
```

---

## 6. Notas Adicionales

- El túnel de localtunnel es **temporal**: se regenera al reiniciar el servicio
- Mantener ambas terminales abiertas mientras se comparte el sitio
- Verificar el firewall si hay problemas de conexión externa
- La URL del túnel expira después de cierto tiempo de inactividad

---

*Última actualización: 13 de abril de 2026*
