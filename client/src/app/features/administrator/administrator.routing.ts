import { Routes } from '@angular/router';

export const administratorRoutes: Routes = [
  {
    path: 'administrators',
    data: { isRoot: true },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/features/administrator/administrator-list/administrator-list.module#AdministratorListModule'
      },
      {
        path: 'new',
        loadChildren: 'app/features/administrator/administrator-form/administrator-form.module#AdministratorFormModule'
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: 'app/features/administrator/administrator-form/administrator-form.module#AdministratorFormModule'
          },
          {
            path: 'update',
            loadChildren: 'app/features/administrator/administrator-form/administrator-form.module#AdministratorFormModule',
            data: { isUpdate: true }
          }
        ]
      }
    ]
  }
];
