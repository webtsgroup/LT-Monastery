import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { GroupFormComponent } from './group-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';
import { TooltipModule } from 'ng2-tooltip';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DropdownModule, AutoCompleteModule, CalendarModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: GroupFormComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    SelectModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DropdownModule,
    AutoCompleteModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupFormComponent]
})
export class GroupFormModule { }
