import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private readonly STORAGE_KEY = 'bluetravels_servicios';
  private readonly FAVORITES_KEY = 'bluetravels_favoritos';
  private readonly CONTACTOS_KEY = 'bluetravels_contactos';

  private serviciosDefault: Servicio[] = [
    {
      id: 1,
      nombre: 'Avistamiento de Ballenas Azules',
      descripcion: 'Experimenta el encuentro más cercano con las majestuosas ballenas azules en su hábitat natural. Esta excursión de medio día te lleva a las aguas profundas del Pacífico donde estas gigantes marinas se alimentan y juegan.',
      precio: 15000,
      duracion: '4 horas',
      ubicacion: 'Golfo de Tortuga, Pacífico Colombiano, Colombia',
      imagen: 'img/ballena-azul.jpg',
      incluye: ['Transporte desde hotel', 'Guía bilingüe certificado', 'Equipo de snorkel', 'Refrigerio'],
      disponible: true
    },
    {
      id: 2,
      nombre: 'Navegación al Atardecer con Ballenas Jorobadas',
      descripcion: 'Disfruta de un recorrido nocturno donde las ballenas jorobadas emergen para sus cantos característicos. Incluye cena a bordo y experiencia de avistamiento con equipos de sonar subacuático.',
      precio: 22000,
      duracion: '6 horas',
      ubicacion: 'Puerto Escoces, México',
      imagen: 'img/ballena-jorobada.jpg',
      incluye: ['Transporte desde hotel', 'Guía marine-biólogo', 'Cena gourmet a bordo', 'Equipo de sonar', 'Certificado de avistamiento'],
      disponible: true
    },
    {
      id: 3,
      nombre: 'Expedición Fotográfica de Ballenas Francas',
      descripcion: 'Una experiencia exclusiva para fotógrafos naturales. Navega en kayak y pequeñas balsas para capturar tomas únicas de las ballenas francas australes en aguas cristalinas de Argentina.',
      precio: 35000,
      duracion: '8 horas',
      ubicacion: 'Península Valdés, Argentina',
      imagen: 'img/ballena-franca.jpg',
      incluye: ['Transporte privado', 'Fotógrafo profesional', 'Equipo fotográfico submarino', 'Kayak/plataforma de observación', 'Almuerzo gourmet'],
      disponible: false
    }
  ];

  private serviciosSubject = new BehaviorSubject<Servicio[]>(this.cargarServiciosDesdeStorage());
  public servicios$ = this.serviciosSubject.asObservable();

  constructor() {
    this.inicializarServicios();
  }

  private cargarServiciosDesdeStorage(): Servicio[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : this.serviciosDefault;
  }

  private inicializarServicios(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.serviciosDefault));
      this.serviciosSubject.next(this.serviciosDefault);
    }
  }

  getServicios(): Servicio[] {
    return this.serviciosSubject.value;
  }

  getServicioById(id: number): Servicio | undefined {
    return this.serviciosSubject.value.find(s => s.id === id);
  }

  crearServicio(servicio: Omit<Servicio, 'id'>): Servicio {
    const servicios = this.serviciosSubject.value;
    const maxId = Math.max(...servicios.map(s => s.id), 0);
    const nuevoServicio: Servicio = {
      ...servicio,
      id: maxId + 1
    };
    const nuevosServicios = [...servicios, nuevoServicio];
    this.guardarServicios(nuevosServicios);
    return nuevoServicio;
  }

  actualizarServicio(id: number, servicioActualizado: Partial<Servicio>): boolean {
    const servicios = this.serviciosSubject.value;
    const index = servicios.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    const nuevosServicios = [...servicios];
    nuevosServicios[index] = { ...nuevosServicios[index], ...servicioActualizado };
    this.guardarServicios(nuevosServicios);
    return true;
  }

  eliminarServicio(id: number): boolean {
    const servicios = this.serviciosSubject.value;
    const index = servicios.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    const nuevosServicios = servicios.filter(s => s.id !== id);
    this.guardarServicios(nuevosServicios);
    return true;
  }

  private guardarServicios(servicios: Servicio[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(servicios));
    this.serviciosSubject.next(servicios);
  }

  getFavoritos(): number[] {
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  toggleFavorito(id: number): boolean {
    const favoritos = this.getFavoritos();
    const index = favoritos.indexOf(id);
    
    if (index === -1) {
      favoritos.push(id);
    } else {
      favoritos.splice(index, 1);
    }
    
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favoritos));
    return index === -1;
  }

  esFavorito(id: number): boolean {
    return this.getFavoritos().includes(id);
  }

  guardarContacto(contacto: any): void {
    const contactos = this.getContactos();
    contactos.push({
      ...contacto,
      fecha: new Date().toISOString()
    });
    localStorage.setItem(this.CONTACTOS_KEY, JSON.stringify(contactos));
  }

  getContactos(): any[] {
    const stored = localStorage.getItem(this.CONTACTOS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(precio);
  }
}
