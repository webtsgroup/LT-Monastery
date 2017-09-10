import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { UserFormComponent } from './user-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { TooltipModule } from 'ng2-tooltip';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FileUploadModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    SelectModule,
    CKEditorModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    CustomFormsModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserFormComponent]
})
export class UserFormModule { }
