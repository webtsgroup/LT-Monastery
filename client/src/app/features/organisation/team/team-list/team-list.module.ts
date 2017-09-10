import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/module/shared.module';
import { TeamListComponent } from './team-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: TeamListComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    CheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeamListComponent]
})
export class TeamListModule { }
