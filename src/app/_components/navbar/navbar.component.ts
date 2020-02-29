import {Component} from '@angular/core';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {SharedService} from '../../_helpers/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sidenav = false;
  user;

  constructor(private route: Router, private shared: SharedService) {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
  }

  responsiveNav(): void {
    $('.nav-fostrap').toggleClass('visible');
    $('body').toggleClass('cover-bg');
    if (!this.sidenav) {
      this.shared.isVisible.next(true);
      this.sidenav = true;
    } else {
      this.shared.isVisible.next(false);
      this.sidenav = false;
    }
  }

  logOut(): void {
    localStorage.clear();
    this.route.navigate(['']);
  }
}
