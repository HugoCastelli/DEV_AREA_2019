import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ApkComponent} from "./apk/apk.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'client.apk', component: ApkComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentBlankRoutingModule {
}
