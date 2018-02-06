import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/module/shared.module';
import { JobComponent } from './job.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule, ConfirmDialogModule, DialogModule, ConfirmationService } from 'primeng/primeng';

const _routes: Routes = [
  {
    path: '',
    component: JobComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    RouterModule.forChild(_routes)
  ],
  providers: [ConfirmationService],
  declarations: [JobComponent]
})

export class JobModule { }
