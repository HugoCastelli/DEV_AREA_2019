import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };
  servicesActive: any;
  services: any;
  areas = [];

  constructor(public http: HttpClient, private route: Router, private params: ActivatedRoute) {}

  ngOnInit() {
    this.getParams();
    this.getServicesArea();
    this.getServices();
    this.getAreas();
  }

  getParams(): void {
    const code = this.params.snapshot.queryParamMap as any;

    if ((code.params.code && code.params.from) || this.params.snapshot.fragment) {
      const requestActivatedServices = this.baseUrl + '/services/' + code.params.from + '/oauth';
      console.log(requestActivatedServices)
      this.http.post(requestActivatedServices, {url: window.location.href}, this.httpOptions)
        .subscribe((success: any) => {
          console.log(success.body);
          localStorage.setItem('services', JSON.stringify(success.body));
          this.getServices();
        }, error => {
          console.log(error);
        });
    }
  }

  getServicesActiveCount(): number {
    let nbServices = 0;

    for (let each of Object.keys(this.servicesActive)) {
      nbServices++;
    }
    return nbServices
  }

  getServices(): void {
    this.servicesActive = JSON.parse(localStorage.getItem('services'));
  }

  active(service): any {
    console.log(this.servicesActive)
    for (let each of Object.keys(this.servicesActive)) {
      if (each === service) {
        return true;
      }
    }
    return false;
  }

  getServicesArea(): void {
    const requestServices = this.baseUrl + '/services';

    this.http.get(requestServices, this.httpOptions)
      .subscribe((success: any) => {
        console.log(success.body);
        this.services = success.body;
      }, error => {
        console.log(error);
      });
  }

  getAreas(): void {
    const requestAreas = this.baseUrl + '/users/areas';

    this.http.get(requestAreas, this.httpOptions)
      .subscribe((success: any) => {
        const area = Object.keys(success.body);
        this.areas = [];
        for (let each of area) {
          console.log(success.body[each]);
          this.areas.push(success.body[each]);
        }
      }, error => {
        console.log(error);
      });
  }

  changeStatus(area_name, index): void {
    const requestServiceAction = this.baseUrl + '/users/areas/' + area_name + '/switch';
    this.http.post(requestServiceAction, {}, this.httpOptions)
      .subscribe((success: any) => {
        this.areas[index] = success.body
      }, error => {
        console.log(error);
      });
  }

  changeServicesStatus(service): void {
    if (this.active(service)) {
      this.deleteServices(service);
    } else {
      for (let each of this.services) {
        if (each.name === service && each.oauth2 === true) {
          // @ts-ignore
          window.location = each.connectUrl;
          return;
        }
        if (each.name === service && each.oauth2 === false) {
          const requestServiceAction = this.baseUrl + '/users/services/' + service;
          this.http.post(requestServiceAction, {name: service}, this.httpOptions)
            .subscribe((success: any) => {
              console.log(success.body);
              localStorage.setItem('services', JSON.stringify(success.body));
              this.getServices();
            }, error => {
              console.log(error);
            });
          return;
        }
      }
    }
  }

  deleteServices(serviceName): void {
    const requestServiceAction = this.baseUrl + '/users/services/' + serviceName;

    this.http.delete(requestServiceAction, this.httpOptions)
      .subscribe((success: any) => {
        console.log(success.body);
        localStorage.setItem('services', JSON.stringify(success.body));
        this.getServices();
      }, error => {
        console.log(error);
      });
  }

  deleteAreas(areaName): void {
    const requestServiceArea = this.baseUrl + '/users/areas/' + areaName;

    this.http.delete(requestServiceArea, this.httpOptions)
      .subscribe((success: any) => {
        console.log(success.body);
        this.getAreas();
      }, error => {
        console.log(error);
      });
  }
}
