import { Routes } from '@angular/router';

export const groupRoutes: Routes = [
  {
    path: 'groups',
    data: { isRoot: true },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/features/group/group-list/group-list.module#GroupListModule'
      },
      {
        path: 'new',
        loadChildren: 'app/features/group/group-form/group-form.module#GroupFormModule'
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: 'app/features/group/group-detail/group-detail.module#GroupDetailModule'
          },
          {
            path: 'update',
            loadChildren: 'app/features/group/group-form/group-form.module#GroupFormModule',
            data: { isUpdate: true }
          }
        ]
      }
    ]
  }
];
