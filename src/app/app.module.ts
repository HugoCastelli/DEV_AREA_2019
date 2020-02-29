import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

import {LayoutBlankComponent} from './_views/layout-blank/layout-blank.component';
import {LayoutNavbarComponent} from './_views/layout-navbar/layout-navbar.component';
import {PageModule} from './_components/page.module';
import {ParticlesModule} from 'angular-particle';

@NgModule({
  declarations: [
    AppComponent,
    LayoutBlankComponent,
    LayoutNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PageModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    ParticlesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
