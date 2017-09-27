import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { UserListComponent } from './user-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DropdownModule, DataTableModule, CheckboxModule, ConfirmDialogModule, ConfirmationService, MultiSelectModule  } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CheckboxModule,
    ConfirmDialogModule,
    MultiSelectModule,
    DropdownModule,
    RouterModule.forChild(routes)
  ],
  providers: [ConfirmationService],
  declarations: [UserListComponent]
})
export class UserListModule { }
