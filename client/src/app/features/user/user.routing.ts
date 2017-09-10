import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'users',
    data: { isRoot: true },
    children: [
      {
        path: ':slug',
        data: { isMod: true, withoutComp: true },
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: 'app/features/user/user-list/user-list.module#UserListModule'
          },
          {
            path: 'new',
            loadChildren: 'app/features/user/user-form/user-form.module#UserFormModule'
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                pathMatch: 'full',
                loadChildren: 'app/features/user/user-detail/user-detail.module#UserDetailModule'
              },
              {
                path: 'update',
                loadChildren: 'app/features/user/user-form/user-form.module#UserFormModule',
                data: { isUpdate: true }
              }
            ]
          }
        ]
      }
    ]
  }
];
