export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
  ubicacion: string;
  imagen: string;
  incluye: string[];
  disponible: boolean;
}

export interface FormularioContacto {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
  fecha: string;
}
