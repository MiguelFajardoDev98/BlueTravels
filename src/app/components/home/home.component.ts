import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Planeemos Tu Próximo Viaje</h1>
        <p class="hero-subtitle">Encuentra las mejores experiencias de avistamiento de ballenas</p>
        
        <form class="search-form" (submit)="buscar($event)">
          <div class="search-form-grid">
            <div class="search-field">
              <label>Destino</label>
              <select [(ngModel)]="filtros.destino" name="destino" class="w-full" style="padding: 0.75rem 1rem; border: 2px solid var(--color-border); border-radius: var(--radius-lg);">
                <option value="">Todos los destinos</option>
                <option value="colombia">Colombia</option>
                <option value="mexico">México</option>
                <option value="argentina">Argentina</option>
              </select>
            </div>
            <div class="search-field">
              <label>Experiencia</label>
              <select [(ngModel)]="filtros.experiencia" name="experiencia" class="w-full" style="padding: 0.75rem 1rem; border: 2px solid var(--color-border); border-radius: var(--radius-lg);">
                <option value="">Todas</option>
                <option value="avistamiento">Avistamiento</option>
                <option value="fotografico">Fotográfico</option>
                <option value="navegacion">Navegación</option>
              </select>
            </div>
            <div class="search-field">
              <label>Fecha</label>
              <input type="date" [(ngModel)]="filtros.fecha" name="fecha" style="padding: 0.75rem 1rem; border: 2px solid var(--color-border); border-radius: var(--radius-lg); width: 100%;">
            </div>
            <div class="search-field">
              <label>Personas</label>
              <select [(ngModel)]="filtros.personas" name="personas" class="w-full" style="padding: 0.75rem 1rem; border: 2px solid var(--color-border); border-radius: var(--radius-lg);">
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5+">5+ personas</option>
              </select>
            </div>
          </div>
          <div class="text-center mt-4">
            <button type="submit" class="search-btn">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Buscar Experiencias
            </button>
          </div>
        </form>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Experiencias Destacadas</h2>
          <a routerLink="/catalogo" class="section-link">Ver todas →</a>
        </div>
        <div class="grid-3">
          <article *ngFor="let servicio of serviciosDestacados" class="service-card">
            <div class="service-card-image">
              <img [src]="'/img/' + getImageName(servicio.imagen)" [alt]="servicio.nombre" onerror="this.style.display='none'">
              <span class="badge service-card-badge" [class]="servicio.disponible ? 'badge-success' : 'badge-error'">
                {{ servicio.disponible ? 'Disponible' : 'Agotado' }}
              </span>
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

    <section class="section bg-white" style="border-radius: 2rem 2rem 0 0;">
      <div class="container">
        <h2 class="section-title text-center mb-6">¿Por qué elegirnos?</h2>
        <div class="grid-3">
          <div class="card p-6 text-center">
            <div class="icon-circle mx-auto mb-4">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Guías Expertos</h3>
            <p class="text-sm text-gray-500">Marine-biólogos certificados con años de experiencia</p>
          </div>
          <div class="card p-6 text-center">
            <div class="icon-circle mx-auto mb-4">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Conservación</h3>
            <p class="text-sm text-gray-500">Turismo responsable con protocolos estrictos</p>
          </div>
          <div class="card p-6 text-center">
            <div class="icon-circle mx-auto mb-4">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">98% Avistamiento</h3>
            <p class="text-sm text-gray-500">La mayor tasa de éxito del mercado</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="card p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p class="text-3xl font-bold text-brand">15+</p>
              <p class="text-sm text-gray-500">Años de experiencia</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-brand">5000+</p>
              <p class="text-sm text-gray-500">Viajes realizados</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-brand">98%</p>
              <p class="text-sm text-gray-500">Tasa de avistamiento</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-brand">3</p>
              <p class="text-sm text-gray-500">Continentes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%);
      border-radius: 0 0 var(--radius-lg) var(--radius-lg);
      padding: 2rem 1.5rem 4rem;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 80%;
      height: 200%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: rotate(-15deg);
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 1200px;
      margin: 0 auto;
    }
    .hero-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .hero-subtitle {
      font-size: 0.875rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
    }
    .search-form {
      background: var(--color-bg-white);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    }
    .search-form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      .search-form-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .search-field {
      display: flex;
      flex-direction: column;
    }
    .search-field label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-bottom: 0.375rem;
      text-transform: uppercase;
    }
    .search-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 2rem;
      background-color: var(--color-brand);
      color: white;
      border: none;
      border-radius: var(--radius-lg);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .search-btn:hover {
      background-color: var(--color-brand-dark);
      transform: scale(1.02);
    }
    .section {
      padding: 2rem 1.5rem;
    }
    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .section-link {
      color: var(--color-brand);
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    @media (max-width: 768px) {
      .grid-3 {
        grid-template-columns: 1fr;
      }
    }
    .service-card {
      background: var(--color-bg-white);
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--color-border);
    }
    .service-card-image {
      height: 160px;
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, var(--color-brand-50) 0%, var(--color-brand-100) 100%);
    }
    .service-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .service-card-badge {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
    }
    .service-card-content {
      padding: 1rem;
    }
    .service-card-title {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    .service-card-location {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .service-card-desc {
      font-size: 0.75rem;
      color: #64748b;
      line-height: 1.4;
    }
    .service-card-price {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--color-brand);
    }
    .service-card-price span {
      font-size: 0.75rem;
      font-weight: 400;
      color: var(--color-text-muted);
    }
    .card {
      background: var(--color-bg-white);
      border-radius: var(--radius-lg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .btn-primary {
      background-color: var(--color-brand);
      color: white;
      border-radius: var(--radius-lg);
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .btn-primary:hover {
      background-color: var(--color-brand-dark);
    }
    .badge {
      display: inline-flex;
      padding: 0.375rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge-success {
      background-color: #d1fae5;
      color: #065f46;
    }
    .badge-error {
      background-color: #fee2e2;
      color: #991b1b;
    }
    .icon-circle {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: var(--color-brand-50);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-circle .icon {
      width: 32px;
      height: 32px;
      color: var(--color-brand);
    }
    .bg-white {
      background-color: var(--color-bg-white);
    }
    .text-center {
      text-align: center;
    }
    .text-brand {
      color: var(--color-brand);
    }
    .text-gray-500 {
      color: var(--color-text-secondary);
    }
    .text-lg {
      font-size: 1.125rem;
    }
    .text-sm {
      font-size: 0.875rem;
    }
    .font-bold {
      font-weight: 700;
    }
    .flex {
      display: flex;
    }
    .items-center {
      align-items: center;
    }
    .justify-between {
      justify-content: space-between;
    }
    .mx-auto {
      margin-left: auto;
      margin-right: auto;
    }
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    .mb-6 {
      margin-bottom: 1.5rem;
    }
    .mt-3 {
      margin-top: 0.75rem;
    }
    .mt-4 {
      margin-top: 1rem;
    }
    .gap-4 {
      gap: 1rem;
    }
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 768px) {
      .md\\:grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  serviciosDestacados: Servicio[] = [];
  filtros = {
    destino: '',
    experiencia: '',
    fecha: '',
    personas: '2'
  };

  constructor(
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const servicios = this.servicioService.getServicios();
    this.serviciosDestacados = servicios.slice(0, 3);
  }

  formatearPrecio(precio: number): string {
    return this.servicioService.formatearPrecio(precio);
  }

  getImageName(path: string): string {
    return path ? (path.split('/').pop() || '') : '';
  }

  buscar(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/catalogo'], { 
      queryParams: { 
        destino: this.filtros.destino,
        experiencia: this.filtros.experiencia
      } 
    });
  }
}
