import { Routes } from '@angular/router';

export const positionRoutes: Routes = [
  {
    path: 'positions',
    data: { isRoot: true },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/features/organisation/position/position-list/position-list.module#PositionListModule'
      },
      {
        path: 'tree',
        loadChildren: 'app/features/organisation/position/position-tree/position-tree.module#PositionTreeModule'
      },
      {
        path: 'new',
        loadChildren: 'app/features/organisation/position/position-tree/position-tree.module#PositionTreeModule'
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: 'app/features/organisation/position/position-tree/position-tree.module#PositionTreeModule'
          },
          {
            path: 'update',
            loadChildren: 'app/features/organisation/position/position-tree/position-tree.module#PositionTreeModule',
            data: { isUpdate: true }
          }
        ]
      }
    ]
  }
];
