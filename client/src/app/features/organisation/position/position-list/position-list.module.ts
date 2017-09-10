import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/module/shared.module';
import { PositionListComponent } from './position-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule } from 'primeng/primeng';


const routes: Routes = [
  {
    path: '',
    component: PositionListComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PositionListComponent]
})
export class PositionListModule { }
