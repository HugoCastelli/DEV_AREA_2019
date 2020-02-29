import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HelpComponent} from './help/help.component';
import {AppletComponent} from './applet/applet.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'help', component: HelpComponent},
  {path: 'create', component: AppletComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule {
}
