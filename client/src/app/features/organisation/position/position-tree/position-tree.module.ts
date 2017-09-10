import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/module/shared.module';
import { PositionTreeComponent } from './position-tree.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PositionTreeComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PositionTreeComponent]
})
export class PositionTreeModule { }
