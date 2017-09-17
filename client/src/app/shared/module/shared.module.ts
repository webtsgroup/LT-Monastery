import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth.service';
import { I18N_PROVIDERS } from '../../core/service/i18n/i18n.service';
import { API_PROVIDERS } from '../../core/service/api/api.service';
import { AuthGuard } from '../../core/service/auth/auth-guard';
import { CanDeactivateGuard } from '../../core/service/auth/can-deactivate-guard';
import { LoadingDirective } from '../directive/loading/loading.directive';
import { EmptyDataDirective } from '../directive/data/emptyData.directive';
import { ImagePipe } from '../pipe/image/image.pipe';
import { HtmlPipe } from '../pipe/html/html.pipe';
import { BreadcrumbModule } from '../layout/breadcrumb/breadcrumb.module';
import { PermissionDirective } from '../../core/directive/permission.directive';

const AUTH_PROVIDERS = [
  AuthService,
  AuthGuard,
  CanDeactivateGuard
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    BreadcrumbModule
  ],
  declarations: [LoadingDirective, EmptyDataDirective, ImagePipe, HtmlPipe, PermissionDirective],
  providers: [I18N_PROVIDERS, API_PROVIDERS, AUTH_PROVIDERS],
  exports: [LoadingDirective, EmptyDataDirective, BreadcrumbModule, RouterModule, TranslateModule, CommonModule, FormsModule, ImagePipe, HtmlPipe, PermissionDirective]
})
export class SharedModule { }
