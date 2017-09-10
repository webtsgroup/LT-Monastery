import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { AdministratorListComponent } from './administrator-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule } from 'primeng/primeng';

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
    RouterModule.forChild(routes)
  ],
  declarations: [AdministratorListComponent]
})
export class AdministratorListModule { }
