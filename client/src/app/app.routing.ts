import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authRoutes } from './auth/auth.routing';
import { featureRoutes } from './features/feature.routing';

const routes: Routes = [
  ...authRoutes,
  ...featureRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
