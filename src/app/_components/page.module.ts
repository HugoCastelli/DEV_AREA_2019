import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentRoutingModule} from './page-routing.module';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppletComponent} from './applet/applet.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {HelpComponent} from './help/help.component';
import {AdminComponent} from './admin/admin.component';
import {_MatMenuDirectivesModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule,
  MatSlideToggleModule, MatStepperModule, MatTreeModule} from '@angular/material';
import {SharedService} from '../_helpers/shared.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {TextInputHighlightModule} from 'angular-text-input-highlight';
import {ContenteditableValueAccessorModule} from '@tinkoff/angular-contenteditable-accessor';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    HelpComponent,
    AppletComponent,
    AdminComponent
  ],
  exports: [
    NavbarComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    NgbDropdownModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    TextInputHighlightModule,
    MatSlideToggleModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    ContenteditableValueAccessorModule,
    MatTreeModule,
    MatListModule,
    SweetAlert2Module,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    SharedService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule {
}
