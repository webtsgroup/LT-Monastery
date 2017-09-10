import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/module/shared.module';
import { TeamFormComponent } from './team-form.component';
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
    component: TeamFormComponent
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
  declarations: [TeamFormComponent]
})
export class TeamFormModule { }
