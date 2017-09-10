import { Routes } from '@angular/router';

export const wikiRoutes: Routes = [
  {
    path: 'wiki',
    loadChildren: 'app/features/wiki/wiki.module#WikiModule'
  }
];
