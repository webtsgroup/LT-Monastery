import { Routes } from '@angular/router';
import { userRoutes } from './user/user.routing';
import { eventRoutes } from './event/event.routing';
import { administratorRoutes } from './administrator/administrator.routing';
import { dashboardRoutes } from './dashboard/dashboard.routing';
import { groupRoutes } from './group/group.routing';
import { jobRoutes } from './job/job.routing';
import { FeatureComponent } from './feature.component';
import { AuthGuard } from '../core/service/auth/auth-guard';

export const featureRoutes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    canActivate: [AuthGuard],
    children: [
      ...eventRoutes,
      ...userRoutes,
      ...administratorRoutes,
      ...dashboardRoutes,
      ...groupRoutes,
      ...jobRoutes,
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
