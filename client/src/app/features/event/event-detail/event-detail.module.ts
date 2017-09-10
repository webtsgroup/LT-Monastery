import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { EventDetailComponent } from './event-detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EventDetailComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventDetailComponent]
})
export class EventDetailModule { }
