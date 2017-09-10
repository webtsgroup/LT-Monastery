import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/module/shared.module';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const _routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(_routes)
  ],
  declarations: [DashboardComponent]
})

export class DashboardModule { }
