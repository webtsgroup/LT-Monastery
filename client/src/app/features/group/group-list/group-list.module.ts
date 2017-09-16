import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { GroupListComponent } from './group-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent
  }
];


@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupListComponent]
})
export class GroupListModule { }
