import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/module/shared.module';
import { WikiComponent } from './wiki.component';
import { Routes, RouterModule } from '@angular/router';

const _routes: Routes = [
  {
    path: '',
    component: WikiComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(_routes)
  ],
  declarations: [WikiComponent]
})

export class WikiModule { }
