import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="bg-white py-6 px-4" style="border-radius: 0 0 2rem 2rem;">
      <div class="container">
        <h1 class="text-2xl font-bold">Catálogo de Experiencias</h1>
        <p class="text-gray-500 text-sm mt-1">Encuentra tu próxima aventura</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="flex justify-between items-center mb-6">
          <button (click)="mostrarFormulario = !mostrarFormulario" class="btn-primary">
            {{ mostrarFormulario ? 'Cancelar' : '+ Nuevo Tour' }}
          </button>
          <p class="text-sm text-gray-500">Mostrando {{ servicios.length }} experiencias</p>
        </div>

        <div *ngIf="mostrarFormulario" class="card p-6 mb-6" style="background: var(--color-bg-white); border-radius: var(--radius-lg);">
          <h3 class="font-bold text-lg mb-4">Crear Nuevo Tour</h3>
          <form (submit)="crearServicio($event)" class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Nombre *</label>
                <input [(ngModel)]="nuevoServicio.nombre" name="nombre" required class="input">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Ubicación *</label>
                <input [(ngModel)]="nuevoServicio.ubicacion" name="ubicacion" required class="input">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Precio (USD) *</label>
                <input [(ngModel)]="nuevoServicio.precio" name="precio" type="number" required class="input">
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Duración *</label>
                <input [(ngModel)]="nuevoServicio.duracion" name="duracion" required class="input" placeholder="Ej: 4 horas">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Descripción *</label>
              <textarea [(ngModel)]="nuevoServicio.descripcion" name="descripcion" rows="3" required class="input"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">URL Imagen</label>
              <input [(ngModel)]="nuevoServicio.imagen" name="imagen" class="input" placeholder="img/nombre.jpg">
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Incluye (separados por coma)</label>
              <input [(ngModel)]="incluyeTexto" name="incluye" class="input" placeholder="Guía, transporte, almuerzo">
            </div>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2">
                <input [(ngModel)]="nuevoServicio.disponible" name="disponible" type="checkbox">
                <span class="text-sm">Disponible</span>
              </label>
            </div>
            <button type="submit" class="btn-primary">Guardar Tour</button>
          </form>
        </div>

        <div class="grid-3">
          <article *ngFor="let servicio of servicios" class="service-card">
            <div class="service-card-image">
              <img [src]="'/img/' + getImageName(servicio.imagen)" [alt]="servicio.nombre" onerror="this.style.display='none'">
              <div class="image-fallback" *ngIf="!servicio.imagen">
                <svg class="w-16 h-16 text-brand opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <span class="badge service-card-badge" [class]="servicio.disponible ? 'badge-success' : 'badge-error'">
                {{ servicio.disponible ? 'Disponible' : 'Agotado' }}
              </span>
              <button (click)="eliminarServicio(servicio.id)" class="btn-delete" title="Eliminar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
            <div class="service-card-content">
              <h3 class="service-card-title">{{ servicio.nombre }}</h3>
              <p class="service-card-location">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                {{ servicio.ubicacion }}
              </p>
              <p class="service-card-desc">{{ servicio.descripcion.substring(0, 80) }}...</p>
              <div class="flex items-center justify-between mt-3">
                <div class="service-card-price">
                  {{ formatearPrecio(servicio.precio) }}
                  <span>/ persona</span>
                </div>
                <a [routerLink]="['/detalle', servicio.id]" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                  Ver
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section { padding: 2rem 1.5rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    @media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr; } }
    .service-card { background: var(--color-bg-white); border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--color-border); }
    .service-card-image { height: 160px; position: relative; overflow: hidden; background: linear-gradient(135deg, var(--color-brand-50) 0%, var(--color-brand-100) 100%); }
    .service-card-image img { width: 100%; height: 100%; object-fit: cover; }
    .image-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .service-card-badge { position: absolute; top: 0.75rem; right: 0.75rem; }
    .service-card-content { padding: 1rem; }
    .service-card-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
    .service-card-location { font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.25rem; }
    .service-card-desc { font-size: 0.75rem; color: #64748b; line-height: 1.4; }
    .service-card-price { font-size: 1.125rem; font-weight: 700; color: var(--color-brand); }
    .service-card-price span { font-size: 0.75rem; font-weight: 400; color: var(--color-text-muted); }
    .btn-primary { background-color: var(--color-brand); color: white; border-radius: var(--radius-lg); padding: 0.75rem 1.5rem; font-weight: 600; border: none; cursor: pointer; }
    .btn-primary:hover { background-color: var(--color-brand-dark); }
    .btn-delete { position: absolute; top: 0.75rem; left: 0.75rem; background: rgba(239, 68, 68, 0.9); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .btn-delete:hover { background: #dc2626; }
    .badge { display: inline-flex; padding: 0.375rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; }
    .badge-success { background-color: #d1fae5; color: #065f46; }
    .badge-error { background-color: #fee2e2; color: #991b1b; }
    .card { background: var(--color-bg-white); border-radius: var(--radius-lg); }
    .input { width: 100%; padding: 0.875rem 1rem; border: 2px solid var(--color-border); border-radius: var(--radius-lg); font-size: 1rem; background: var(--color-bg-white); }
    .input:focus { outline: none; border-color: var(--color-brand); }
    .text-2xl { font-size: 1.5rem; }
    .font-bold { font-weight: 700; }
    .text-lg { font-size: 1.125rem; }
    .text-sm { font-size: 0.875rem; }
    .text-gray-500 { color: var(--color-text-secondary); }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mt-1 { margin-top: 0.25rem; }
    .mt-3 { margin-top: 0.75rem; }
    .p-6 { padding: 1.5rem; }
    .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .bg-white { background-color: var(--color-bg-white); }
    .space-y-4 > * + * { margin-top: 1rem; }
    .grid { display: grid; }
    .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    @media (min-width: 768px) { .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
    .w-5 { width: 1.25rem; }
    .h-5 { height: 1.25rem; }
  `]
})
export class CatalogoComponent implements OnInit {
  servicios: Servicio[] = [];
  mostrarFormulario = false;
  incluyeTexto = '';
  
  nuevoServicio = {
    nombre: '',
    descripcion: '',
    precio: 0,
    duracion: '',
    ubicacion: '',
    imagen: '',
    incluye: [] as string[],
    disponible: true
  };

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicios = this.servicioService.getServicios();
  }

  crearServicio(event: Event): void {
    event.preventDefault();
    if (!this.nuevoServicio.nombre || !this.nuevoServicio.descripcion) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    const servicioParaCrear = {
      ...this.nuevoServicio,
      incluye: this.incluyeTexto.split(',').map(s => s.trim()).filter(s => s)
    };

    this.servicioService.crearServicio(servicioParaCrear);
    this.cargarServicios();
    this.mostrarFormulario = false;
    this.resetFormulario();
  }

  eliminarServicio(id: number): void {
    if (confirm('¿Estás seguro de eliminar este tour?')) {
      this.servicioService.eliminarServicio(id);
      this.cargarServicios();
    }
  }

  formatearPrecio(precio: number): string {
    return this.servicioService.formatearPrecio(precio);
  }

  getImageName(path: string): string {
    return path ? (path.split('/').pop() || '') : '';
  }

  private resetFormulario(): void {
    this.nuevoServicio = {
      nombre: '',
      descripcion: '',
      precio: 0,
      duracion: '',
      ubicacion: '',
      imagen: '',
      incluye: [],
      disponible: true
    };
    this.incluyeTexto = '';
  }
}
