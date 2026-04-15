import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="bg-white py-6 px-4" style="border-radius: 0 0 2rem 2rem;">
      <div class="container">
        <h1 class="text-2xl font-bold">Contáctanos</h1>
        <p class="text-gray-500 text-sm mt-1">Estamos aquí para ayudarte</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h2 class="section-title mb-4">Envíanos un mensaje</h2>
            
            <form (submit)="enviarMensaje($event)" class="contact-form">
              <div class="form-group">
                <label class="form-label">Nombre completo <span>*</span></label>
                <input [(ngModel)]="formulario.nombre" name="nombre" type="text" class="input" placeholder="Tu nombre" required>
              </div>
              
              <div class="form-group">
                <label class="form-label">Correo electrónico <span>*</span></label>
                <input [(ngModel)]="formulario.email" name="email" type="email" class="input" placeholder="tu@correo.com" required>
                <p *ngIf="errorEmail" class="text-red-500 text-sm mt-1">Por favor ingresa un correo válido</p>
              </div>
              
              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input [(ngModel)]="formulario.telefono" name="telefono" type="tel" class="input" placeholder="+1 234 567 890">
              </div>
              
              <div class="form-group">
                <label class="form-label">Servicio de interés</label>
                <select [(ngModel)]="formulario.servicio" name="servicio" class="input">
                  <option value="">Selecciona una opción</option>
                  <option value="avistamiento-azul">Avistamiento Ballenas Azules</option>
                  <option value="navegacion-jorobadas">Navegación Ballenas Jorobadas</option>
                  <option value="expedicion-franca">Expedición Fotográfica</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">Mensaje <span>*</span></label>
                <textarea [(ngModel)]="formulario.mensaje" name="mensaje" rows="4" class="input" placeholder="¿En qué podemos ayudarte?" required></textarea>
              </div>
              
              <button type="submit" class="btn-primary w-full flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Enviar mensaje
              </button>
            </form>

            <div *ngIf="mostrarExito" class="mt-4 p-4 bg-green-50 text-green-700 rounded-2xl">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>¡Mensaje enviado correctamente!</span>
              </div>
            </div>

            <div *ngIf="mostrarError" class="mt-4 p-4 bg-red-50 text-red-700 rounded-2xl">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Por favor completa todos los campos obligatorios.</span>
              </div>
            </div>
          </div>

          <div>
            <h2 class="section-title mb-4">Información de contacto</h2>
            <div class="space-y-4">
              <div class="card p-4 flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">Correo electrónico</h3>
                  <p class="text-gray-500 text-sm">info&#64;bluetravels.com</p>
                  <p class="text-gray-500 text-sm">reservas&#64;bluetravels.com</p>
                </div>
              </div>

              <div class="card p-4 flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">Teléfono</h3>
                  <p class="text-gray-500 text-sm">+1 (555) 123-4567</p>
                  <p class="text-gray-400 text-xs">Lun - Vie, 8:00 - 18:00</p>
                </div>
              </div>

              <div class="card p-4 flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">Oficina principal</h3>
                  <p class="text-gray-500 text-sm">Calle Mar 123, Puerto Costero</p>
                  <p class="text-gray-500 text-sm">Código Postal 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section { padding: 2rem 1.5rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
    .contact-form { background: var(--color-bg-white); border-radius: var(--radius-lg); padding: 1.5rem; border: 1px solid var(--color-border); }
    .form-group { margin-bottom: 1rem; }
    .form-label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; }
    .form-label span { color: #ef4444; }
    .input { width: 100%; padding: 0.875rem 1rem; border: 2px solid var(--color-border); border-radius: var(--radius-lg); font-size: 1rem; background: var(--color-bg-white); }
    .input:focus { outline: none; border-color: var(--color-brand); }
    .btn-primary { background-color: var(--color-brand); color: white; border-radius: var(--radius-lg); padding: 0.75rem 1.5rem; font-weight: 600; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
    .btn-primary:hover { background-color: var(--color-brand-dark); }
    .card { background: var(--color-bg-white); border-radius: var(--radius-lg); box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .text-brand { color: var(--color-brand); }
    .text-gray-500 { color: var(--color-text-secondary); }
    .text-gray-400 { color: var(--color-text-muted); }
    .text-red-500 { color: #ef4444; }
    .text-sm { font-size: 0.875rem; }
    .text-xs { font-size: 0.75rem; }
    .text-2xl { font-size: 1.5rem; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .items-start { align-items: flex-start; }
    .justify-center { justify-content: center; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    .grid { display: grid; gap: 1.5rem; }
    @media (min-width: 768px) { .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
    .mt-1 { margin-top: 0.25rem; }
    .mb-4 { margin-bottom: 1rem; }
    .p-4 { padding: 1rem; }
    .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .w-5 { width: 1.25rem; }
    .h-5 { height: 1.25rem; }
    .w-6 { width: 1.5rem; }
    .h-6 { height: 1.5rem; }
    .w-12 { width: 3rem; }
    .h-12 { height: 3rem; }
    .flex-shrink-0 { flex-shrink: 0; }
    .rounded-full { border-radius: 9999px; }
    .bg-brand-50 { background-color: var(--color-brand-50); }
    .bg-green-50 { background-color: #d1fae5; }
    .bg-red-50 { background-color: #fee2e2; }
    .text-green-700 { color: #065f46; }
    .text-red-700 { color: #991b1b; }
    .rounded-2xl { border-radius: 1rem; }
    .bg-white { background-color: var(--color-bg-white); }
  `]
})
export class ContactoComponent {
  formulario = {
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  };

  mostrarExito = false;
  mostrarError = false;
  errorEmail = false;

  constructor(private servicioService: ServicioService) {}

  enviarMensaje(event: Event): void {
    event.preventDefault();

    if (!this.formulario.nombre || !this.formulario.email || !this.formulario.mensaje) {
      this.mostrarError = true;
      this.mostrarExito = false;
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formulario.email)) {
      this.errorEmail = true;
      this.mostrarError = true;
      this.mostrarExito = false;
      return;
    }

    this.errorEmail = false;
    this.servicioService.guardarContacto(this.formulario);
    
    this.mostrarExito = true;
    this.mostrarError = false;
    this.formulario = { nombre: '', email: '', telefono: '', servicio: '', mensaje: '' };

    setTimeout(() => this.mostrarExito = false, 5000);
  }
}
