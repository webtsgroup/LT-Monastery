import { Routes } from '@angular/router';

export const jobRoutes: Routes = [
  {
    path: 'jobs',
    loadChildren: 'app/features/job/job.module#JobModule'
  }
];
