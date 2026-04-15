import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" style="min-height: 300px; display: flex; align-items: center; justify-content: center; text-align: center;">
      <div class="hero-content">
        <h1 class="hero-title">Nuestra Historia</h1>
        <p class="hero-subtitle">Comprometidos con la conservación marina desde 2010</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="section-title">Sobre BlueTravels</h2>
            <p class="text-gray-600 mb-4">BlueTravels nació en 2010 con una misión clara: crear experiencias de avistamiento de ballenas que sean tanto inolvidables para nuestros clientes como responsables con el medio ambiente.</p>
            <p class="text-gray-600 mb-4">Somos una empresa apasionada por la vida marina y creemos firmemente que al conectar a las personas con estas criaturas majestuosas, fomenta un mayor respeto y protección por nuestros océanos.</p>
            <p class="text-gray-600">Con más de 15 años de experiencia y más de 5,000 expediciones exitosas, nos hemos convertido en líderes en turismo de avistamiento responsable en Latinoamérica.</p>
          </div>
          <div class="card p-8 text-center" style="background: linear-gradient(135deg, var(--color-brand-50), var(--color-brand-100));">
            <div class="grid grid-cols-2 gap-6">
              <div><p class="text-4xl font-bold text-brand">15+</p><p class="text-sm text-gray-600">Años de experiencia</p></div>
              <div><p class="text-4xl font-bold text-brand">5000+</p><p class="text-sm text-gray-600">Expediciones</p></div>
              <div><p class="text-4xl font-bold text-brand">98%</p><p class="text-sm text-gray-600">Tasa de éxito</p></div>
              <div><p class="text-4xl font-bold text-brand">50+</p><p class="text-sm text-gray-600">Guías expertos</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-white" style="border-radius: 2rem 2rem 0 0;">
      <div class="container">
        <h2 class="section-title text-center mb-8">Compromiso con la Sostenibilidad</h2>
        <div class="grid-3">
          <div class="card p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Turismo Responsable</h3>
            <p class="text-sm text-gray-500">Seguimos estrictos protocolos de aproximación para no perturbar el comportamiento natural de las ballenas.</p>
          </div>
          <div class="card p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Certificación AMI</h3>
            <p class="text-sm text-gray-500">Somos miembros certificados de la Alianza Mundial de ballenas y delfines.</p>
          </div>
          <div class="card p-6 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">1% for the Planet</h3>
            <p class="text-sm text-gray-500">Donamos el 1% de nuestras ganancias a organizaciones de conservación marina.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero { background: linear-gradient(135deg, var(--color-brand), var(--color-brand-dark)); color: white; padding: 4rem 1.5rem; }
    .hero-content { max-width: 1200px; margin: 0 auto; }
    .hero-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; }
    .hero-subtitle { font-size: 0.875rem; opacity: 0.9; }
    .section { padding: 2rem 1.5rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    @media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr; } .md\\:grid-cols-2 { grid-template-columns: 1fr; } }
    .grid { display: grid; gap: 2rem; }
    @media (min-width: 768px) { .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
    .card { background: var(--color-bg-white); border-radius: var(--radius-lg); box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .text-brand { color: var(--color-brand); }
    .text-gray-600 { color: var(--color-text-secondary); }
    .text-gray-500 { color: var(--color-text-secondary); }
    .text-lg { font-size: 1.125rem; }
    .text-sm { font-size: 0.875rem; }
    .text-4xl { font-size: 2.25rem; }
    .font-bold { font-weight: 700; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .gap-6 { gap: 1.5rem; }
    .gap-8 { gap: 2rem; }
    .items-center { align-items: center; }
    .p-6 { padding: 1.5rem; }
    .p-8 { padding: 2rem; }
    .bg-white { background-color: var(--color-bg-white); }
    .text-center { text-align: center; }
  `]
})
export class NosotrosComponent {}
