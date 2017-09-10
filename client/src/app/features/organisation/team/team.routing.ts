import { Routes } from '@angular/router';

export const teamRoutes: Routes = [
  {
    path: 'teams',
    data: { isRoot: true },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/features/organisation/team/team-list/team-list.module#TeamListModule'
      },
      {
        path: 'new',
        loadChildren: 'app/features/organisation/team/team-form/team-form.module#TeamFormModule'
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: 'app/features/organisation/team/team-detail/team-detail.module#TeamDetailModule'
          },
          {
            path: 'update',
            loadChildren: 'app/features/organisation/team/team-list/team-list.module#TeamListModule',
            data: { isUpdate: true }
          }
        ]
      }
    ]
  }
];
