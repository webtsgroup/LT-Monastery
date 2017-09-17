import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { GroupListComponent } from './group-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

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
    ConfirmDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [ConfirmationService],
  declarations: [GroupListComponent]
})
export class GroupListModule { }
