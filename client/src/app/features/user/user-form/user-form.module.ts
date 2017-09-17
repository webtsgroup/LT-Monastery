import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SelectModule } from 'ng2-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { TooltipModule } from 'ng2-tooltip';
import { CustomFormsModule } from 'ng2-validation';
import { CalendarModule, GalleriaModule, FileUploadModule } from 'primeng/primeng';
import { SharedModule } from '../../../shared/module/shared.module';
import { UrlSecurePipe } from '../../../shared/pipe/url/url.secure.pipe';
import { UserFormComponent } from './user-form.component';

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
    GalleriaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserFormComponent, UrlSecurePipe]
})
export class UserFormModule { }
