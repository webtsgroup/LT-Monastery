import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { EventDetailComponent } from './event-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, CheckboxModule, ConfirmDialogModule, ConfirmationService, MultiSelectModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: EventDetailComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    MultiSelectModule,
    ConfirmDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [ConfirmationService],
  declarations: [EventDetailComponent]
})
export class EventDetailModule { }
