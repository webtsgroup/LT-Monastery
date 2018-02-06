import { Routes } from '@angular/router';

export const jobRoutes: Routes = [
  {
    path: 'jobs',
    data: {
      isRoot: true
    },
    loadChildren: 'app/features/job/job.module#JobModule'
  }
];
