import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/module/shared.module';
import { TeamDetailComponent } from './team-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: TeamDetailComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeamDetailComponent]
})
export class TeamDetailModule { }
