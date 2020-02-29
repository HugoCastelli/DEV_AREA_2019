import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutBlankComponent} from './_views/layout-blank/layout-blank.component';
import {LayoutNavbarComponent} from './_views/layout-navbar/layout-navbar.component';
import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: LayoutBlankComponent, loadChildren: './_components/page-blank.module#PageBlankModule'},
  {path: 'usr', canActivate: [AuthGuard], component: LayoutNavbarComponent, loadChildren: './_components/page.module#PageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
