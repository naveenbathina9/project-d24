import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/index',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/index'
  },
  {
    path: 'digi24',
    redirectTo: 'digi24',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
