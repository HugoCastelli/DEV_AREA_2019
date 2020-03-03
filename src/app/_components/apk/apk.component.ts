import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.css']
})
export class ApkComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {
    window.open(
      '/assets/apk/build/outputs/apk/release/app-release.apk',
      '_blank'
    );
    this.router.navigate(['/usr/home']);
  }
}
