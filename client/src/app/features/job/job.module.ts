import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/module/shared.module';
import { JobComponent } from './job.component';
import { Routes, RouterModule } from '@angular/router';

const _routes: Routes = [
  {
    path: '',
    component: JobComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(_routes)
  ],
  declarations: [JobComponent]
})

export class JobModule { }
