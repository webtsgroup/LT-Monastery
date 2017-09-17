import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { EventListComponent } from './event-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent
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
  declarations: [EventListComponent]
})
export class EventListModule { }
