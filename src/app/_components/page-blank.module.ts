import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApkComponent} from './apk/apk.component';
import {LoginComponent} from './login/login.component';
import {ComponentBlankRoutingModule} from './page-blank-routing.module';
import {FormsModule} from '@angular/forms';
import {PageModule} from './page.module';
import {ParticlesModule} from "angular-particle";

@NgModule({
  declarations: [
    LoginComponent,
    ApkComponent
  ],
  imports: [
    CommonModule,
    ComponentBlankRoutingModule,
    FormsModule,
    PageModule,
    ParticlesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageBlankModule {
}
