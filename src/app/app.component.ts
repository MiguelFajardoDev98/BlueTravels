import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-content">
        <a routerLink="/home" class="header-logo">
          <svg viewBox="0 0 40 40" fill="currentColor" class="w-8 h-8">
            <path d="M8 28c0-4 3-7 7-7s5 2 5 2 1-2 4-2 4 2 4 4-2 4-4 4c1 3-1 5-4 5h-2c-5 0-10-2-10-6z" fill="#0071b2"/>
            <path d="M12 16c2-4 8-4 10-2" stroke="#0071b2" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M26 17l6-8 2 2-6 8" stroke="#0071b2" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>BlueTravels</span>
        </a>
        
        <nav class="header-nav">
          <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
          <a routerLink="/catalogo" routerLinkActive="active">Catálogo</a>
          <a routerLink="/detalle/1" routerLinkActive="active">Detalles</a>
          <a routerLink="/nosotros" routerLinkActive="active">Nosotros</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
        </nav>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a routerLink="/home">Inicio</a>
          <a routerLink="/catalogo">Catálogo</a>
          <a routerLink="/detalle/1">Detalles</a>
          <a routerLink="/nosotros">Nosotros</a>
          <a routerLink="/contacto">Contacto</a>
        </div>
        <p class="footer-copyright">© 2026 BlueTravels. Todos los derechos reservados.</p>
      </div>
    </footer>

    <nav class="tab-bar">
      <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="tab-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span>Inicio</span>
      </a>
      <a routerLink="/catalogo" routerLinkActive="active" class="tab-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        <span>Catálogo</span>
      </a>
      <a [routerLink]="['/detalle', currentServiceId]" routerLinkActive="active" class="tab-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <span>Detalle</span>
      </a>
      <a routerLink="/nosotros" routerLinkActive="active" class="tab-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span>Nosotros</span>
      </a>
      <a routerLink="/contacto" routerLinkActive="active" class="tab-item">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <span>Contacto</span>
      </a>
    </nav>
  `,
  styles: [`
    .header {
      background: var(--color-bg-white);
      padding: 1rem 1.5rem;
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid var(--color-border);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: var(--color-brand);
    }
    .header-logo span {
      font-size: 1.25rem;
      font-weight: 700;
    }
    .header-nav {
      display: none;
    }
    @media (min-width: 768px) {
      .header-nav {
        display: flex;
        gap: 2rem;
      }
    }
    .header-nav a {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
      padding: 0.5rem;
      border-radius: var(--radius-sm);
    }
    .header-nav a:hover,
    .header-nav a.active {
      color: var(--color-brand);
      background-color: var(--color-brand-50);
    }
    .footer {
      background: var(--color-text);
      color: white;
      padding: 2rem 1.5rem;
      margin-top: auto;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 0.875rem;
      transition: var(--transition);
    }
    .footer-links a:hover {
      color: white;
    }
    .footer-copyright {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
    }
    .tab-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-bg-white);
      border-top: 1px solid var(--color-border);
      padding: 0.5rem 1rem;
      padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0));
      z-index: 1000;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem 1rem;
      color: var(--color-text-muted);
      text-decoration: none;
      transition: var(--transition);
      border-radius: var(--radius-lg);
      min-width: 64px;
    }
    .tab-item:hover {
      background-color: var(--color-bg-alt);
    }
    .tab-item.active {
      color: var(--color-brand);
    }
    .tab-item svg {
      width: 24px;
      height: 24px;
      margin-bottom: 0.25rem;
    }
    .tab-item span {
      font-size: 0.625rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `]
})
export class AppComponent {
  currentServiceId = 1;
}
