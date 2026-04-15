import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'catalogo', 
    loadComponent: () => import('./components/catalogo/catalogo.component').then(m => m.CatalogoComponent) 
  },
  { 
    path: 'detalle/:id', 
    loadComponent: () => import('./components/detalle/detalle.component').then(m => m.DetalleComponent) 
  },
  { 
    path: 'nosotros', 
    loadComponent: () => import('./components/nosotros/nosotros.component').then(m => m.NosotrosComponent) 
  },
  { 
    path: 'contacto', 
    loadComponent: () => import('./components/contacto/contacto.component').then(m => m.ContactoComponent) 
  },
  { path: '**', redirectTo: '/home' }
];
