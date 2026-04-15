import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="servicio" class="animate-fade-in">
      <section class="detail-hero">
        <span class="badge" [class]="servicio.disponible ? 'badge-success' : 'badge-error'">
          {{ servicio.disponible ? '✓ Disponible' : '✕ Agotado' }}
        </span>
        <h1 class="text-2xl font-bold mb-2">{{ servicio.nombre }}</h1>
        <p class="flex items-center text-sm opacity-90">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          </svg>
          {{ servicio.ubicacion }}
        </p>
      </section>

      <section class="detail-content">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="md:col-span-2">
            <div class="detail-section">
              <h2 class="detail-section-title">Descripción</h2>
              <p class="detail-description">{{ servicio.descripcion }}</p>
            </div>

            <div class="detail-section">
              <h2 class="detail-section-title">¿Qué incluye?</h2>
              <ul class="detail-list">
                <li *ngFor="let item of servicio.incluye">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="detail-section">
              <h2 class="detail-section-title">Información</h2>
              <div class="card p-4">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="font-medium">Duración:</span>
                  <span class="text-gray-500">{{ servicio.duracion }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <span class="font-medium">Ubicación:</span>
                  <span class="text-gray-500">{{ servicio.ubicacion }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-1">
            <div class="price-card">
              <p class="price-label">Precio por persona</p>
              <p class="price-value">{{ formatearPrecio(servicio.precio) }}</p>
              
              <button (click)="reservar()" [disabled]="!servicio.disponible || reservado" class="btn-primary w-full mt-4">
                {{ reservado ? '¡Reservado!' : 'Reservar Ahora' }}
              </button>

              <div *ngIf="mostrarNotificacion" class="mt-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm text-center">
                ¡Reservado con éxito!
              </div>

              <button (click)="toggleFavorito()" class="btn-secondary w-full mt-3 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" [attr.fill]="esFavorito ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {{ esFavorito ? 'Guardado' : 'Guardar' }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div *ngIf="!servicio" class="flex justify-center items-center min-h-[50vh]">
      <div class="text-center">
        <p class="text-gray-600 mb-4">No se encontró el servicio</p>
        <a routerLink="/catalogo" class="btn-primary">Ver Catálogo</a>
      </div>
    </div>
  `,
  styles: [`
    .detail-hero {
      background: var(--color-brand);
      color: white;
      padding: 2rem 1.5rem;
      border-radius: 0 0 var(--radius-lg) var(--radius-lg);
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .detail-content { padding: 1.5rem; }
    .detail-section { margin-bottom: 1.5rem; }
    .detail-section-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; }
    .detail-description { color: var(--color-text-secondary); line-height: 1.6; }
    .detail-list { list-style: none; padding: 0; }
    .detail-list li { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; color: var(--color-text-secondary); }
    .price-card { background: var(--color-bg-white); border-radius: var(--radius-lg); padding: 1.5rem; border: 1px solid var(--color-border); position: sticky; top: 80px; }
    .price-value { font-size: 2rem; font-weight: 700; color: var(--color-brand); }
    .price-label { font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 1rem; }
    .btn-primary { background-color: var(--color-brand); color: white; border-radius: var(--radius-lg); padding: 0.75rem 1.5rem; font-weight: 600; border: none; cursor: pointer; width: 100%; }
    .btn-primary:hover:not(:disabled) { background-color: var(--color-brand-dark); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-secondary { background-color: var(--color-bg-white); color: var(--color-brand); border: 2px solid var(--color-brand); border-radius: var(--radius-lg); padding: 0.75rem 1.5rem; font-weight: 600; cursor: pointer; }
    .btn-secondary:hover { background-color: var(--color-brand-50); }
    .badge { display: inline-flex; padding: 0.375rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; }
    .badge-success { background-color: #d1fae5; color: #065f46; }
    .badge-error { background-color: #fee2e2; color: #991b1b; }
    .card { background: var(--color-bg-white); border-radius: var(--radius-lg); }
    .text-brand { color: var(--color-brand); }
    .text-gray-500 { color: var(--color-text-secondary); }
    .text-sm { font-size: 0.875rem; }
    .text-2xl { font-size: 1.5rem; }
    .font-bold { font-weight: 700; }
    .font-medium { font-weight: 500; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .min-h-\\[50vh\\] { min-height: 50vh; }
    .gap-2 { gap: 0.5rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-4 { margin-top: 1rem; }
    .p-3 { padding: 0.75rem; }
    .p-4 { padding: 1rem; }
    .text-center { text-align: center; }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .grid { display: grid; gap: 1.5rem; }
    .md\\:col-span-2 { grid-column: span 2; }
    .md\\:col-span-1 { grid-column: span 1; }
    @media (max-width: 768px) { .md\\:col-span-2, .md\\:col-span-1 { grid-column: span 1; } }
    @media (min-width: 768px) { .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); } }
  `]
})
export class DetalleComponent implements OnInit {
  servicio: Servicio | undefined;
  esFavorito = false;
  reservado = false;
  mostrarNotificacion = false;

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.servicio = this.servicioService.getServicioById(id);
      if (this.servicio) {
        this.esFavorito = this.servicioService.esFavorito(this.servicio.id);
      }
    }
  }

  toggleFavorito(): void {
    if (this.servicio) {
      this.esFavorito = this.servicioService.toggleFavorito(this.servicio.id);
    }
  }

  reservar(): void {
    if (this.servicio?.disponible) {
      this.reservado = true;
      this.mostrarNotificacion = true;
      setTimeout(() => this.mostrarNotificacion = false, 3000);
    }
  }

  formatearPrecio(precio: number): string {
    return this.servicioService.formatearPrecio(precio);
  }
}
