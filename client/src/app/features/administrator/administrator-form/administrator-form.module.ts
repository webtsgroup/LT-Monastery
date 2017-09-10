import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared.module';
import { AdministratorFormComponent } from './administrator-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { TooltipModule } from 'ng2-tooltip';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FileUploadModule } from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: AdministratorFormComponent
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
    RouterModule.forChild(routes)
  ],
  declarations: [AdministratorFormComponent]
})
export class AdministratorFormModule { }
