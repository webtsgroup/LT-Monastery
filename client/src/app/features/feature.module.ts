import { NgModule } from '@angular/core';
import { FeatureComponent } from './feature.component';
import { HeaderModule } from '../shared/layout/header/header.module';
import { SidebarModule } from '../shared/layout/sidebar/sidebar.module';
import { FooterModule } from '../shared/layout/footer/footer.module';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    HeaderModule,
    SidebarModule,
    FooterModule,
    RouterModule
  ]
})

export class FeatureModule { }
