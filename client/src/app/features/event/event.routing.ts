import { Routes } from '@angular/router';

export const eventRoutes: Routes = [
  {
    path: 'events',
    data: { isRoot: true },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/features/event/event-list/event-list.module#EventListModule'
      },
      {
        path: 'new',
        loadChildren: 'app/features/event/event-form/event-form.module#EventFormModule'
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: 'app/features/event/event-detail/event-detail.module#EventDetailModule'
          },
          {
            path: 'update',
            loadChildren: 'app/features/event/event-form/event-form.module#EventFormModule',
            data: { isUpdate: true }
          }
        ]
      }
    ]
  }
];
