import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { EventListComponent } from './event-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule } from 'primeng/primeng';

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
    RouterModule.forChild(routes)
  ],
  declarations: [EventListComponent]
})
export class EventListModule { }
