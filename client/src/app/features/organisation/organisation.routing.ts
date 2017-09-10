import { Routes } from '@angular/router';
import { positionRoutes } from './position/position.routing';
import { teamRoutes } from './team/team.routing';

export const organisationRoutes: Routes = [
  {
    path: 'organisation',
    data: { withoutComp: true },
    children: [
      ...positionRoutes,
      ...teamRoutes
    ]
  }
];
