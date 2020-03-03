import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../_helpers/shared.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.css']
})
export class LayoutNavbarComponent implements OnInit {

  visible = false;

  constructor(private Shared: SharedService) {
  }

  ngOnInit() {
    this.Shared.isVisible.subscribe((isVisible) => {
      this.visible = isVisible;
    });
  }

}
