import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ComponentBlankRoutingModule} from './page-blank-routing.module';
import {FormsModule} from '@angular/forms';
import {PageModule} from './page.module';
import {ParticlesModule} from "angular-particle";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ComponentBlankRoutingModule,
    FormsModule,
    PageModule,
    ParticlesModule
  ]
})
export class PageBlankModule {
}
