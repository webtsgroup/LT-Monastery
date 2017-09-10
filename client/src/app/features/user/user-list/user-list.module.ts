import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { UserListComponent } from './user-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule } from 'primeng/primeng';

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
    RouterModule.forChild(routes)
  ],
  declarations: [UserListComponent]
})
export class UserListModule { }
