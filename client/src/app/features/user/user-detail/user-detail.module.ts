import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { UserDetailComponent } from './user-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserDetailComponent]
})
export class UserDetailModule { }
