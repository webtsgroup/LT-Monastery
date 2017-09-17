import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { AdministratorListComponent } from './administrator-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule, ConfirmDialogModule, ConfirmationService  } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: AdministratorListComponent
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
  declarations: [AdministratorListComponent]
})
export class AdministratorListModule { }
