import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/service/auth/auth-guard';

export const userRoutes: Routes = [
  {
    path: 'users',
    data: { isRoot: true },
    children: [
      {
        path: ':slug',
        data: { isMod: true, withoutComp: true, mod: 'users_:slug',  },
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
