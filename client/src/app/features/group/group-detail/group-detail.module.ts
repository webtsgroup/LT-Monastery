import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { GroupDetailComponent } from './group-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule, ConfirmDialogModule, ConfirmationService, DropdownModule, MultiSelectModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: GroupDetailComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
    RouterModule.forChild(routes)
  ],
  providers: [ConfirmationService],
  declarations: [GroupDetailComponent]
})
export class GroupDetailModule { }
