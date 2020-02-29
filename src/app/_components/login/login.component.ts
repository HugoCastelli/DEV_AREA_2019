import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';

export interface Register {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  password: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  baseUrl = 'http://localhost:8080';
  signup = false;
  confirmPassword = '';
  redirect_uri;
  credentials: Register = {
    name: '',
    password: '',
    email: ''
  };
  credentialsLogin: Login = {
    email: '',
    password: ''
  };
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}),
    observe: 'response' as 'response'
  };

  constructor(private toastr: ToastrService, public http: HttpClient, private route: Router, private params: ActivatedRoute) {
    this.redirect_uri = environment.redirect_uri;
  }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.route.navigate(['/usr/home'])
    }
    const code = this.params.snapshot.queryParamMap as any;

    if (code.params.code && code.params.from === 'google') {
      const requestGoogle = this.baseUrl + '/authgoogle';

      this.http.post(requestGoogle, {google_code: code.params.code}, this.httpOptions)
        .subscribe((success: any) => {
          this.saveData(success.body);
          this.toastr.success('Successfully logged.', 'Success');
          this.route.navigate(['/usr/home']);
        }, error => {
          console.log(error);
          this.toastr.error('Something went wrong.', 'Error');
        });
    }
    if (code.params) {
      const url: string = this.route.url.replace('#', '&');
      const paramsTree: UrlTree = this.route.parseUrl(url);

      if (paramsTree.queryParams.access_token && paramsTree.queryParams.from === 'facebook') {
        const requestFacebook = this.baseUrl + '/authfacebook';

        this.http.post(requestFacebook, {facebook_code: paramsTree.queryParams.access_token}, this.httpOptions)
          .subscribe((success: any) => {
            this.saveData(success.body);
            this.toastr.success('Successfully logged.', 'Success');
            this.route.navigate(['/usr/home']);
          }, error => {
            console.log(error);
            this.toastr.error('Something went wrong.', 'Error');
          });
      }
    }
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 200,
        },
        color: {
          value: 'white'
        },
        shape: {
          type: 'triangle',
        },
      }
    };
  }

  signinClassic(): void {
    const requestLogin = this.baseUrl + '/login';

    if (!this.credentialsLogin.password || !this.credentialsLogin.email) {
      this.toastr.error('You have to fill all the fields.', 'Error');
      return;
    }

    this.http.post(requestLogin, this.credentialsLogin, this.httpOptions)
      .subscribe((success: any) => {
        this.saveData(success.body);
        this.toastr.success('Successfully logged.', 'Success');
        this.route.navigate(['/usr/home']);
      }, error => {
        console.log(error);
        this.toastr.error('Invalid email or password.', 'Error');
      });
  }

  signupClassic(): void {
    const requestRegister = this.baseUrl + '/register';

    if (!this.credentials.name || !this.credentials.email || !this.credentials.password || !this.confirmPassword) {
      this.toastr.error('You have to fill all the fields.', 'Error');
      return;
    }
    if (this.credentials.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match.', 'Error');
      return;
    }

    this.http.post(requestRegister, this.credentials, this.httpOptions)
      .subscribe((success: any) => {
        this.saveData(success.body);
        this.toastr.success('Successfully registered.', 'Success');
        this.route.navigate(['/usr/home']);
      }, error => {
        console.log(error);
        this.toastr.error('Please try again in a moment.', 'Error');
      });
  }

  saveData(data: any): void {
    console.log(data);
    const userData: any = {
      email: data.email,
      name: data.name,
      account_type: data.account_type,
      user_id: data.user_id,
      role: data.role
    };
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('services', JSON.stringify(data.services));
    localStorage.setItem('services_auth', JSON.stringify(data.services_auth));
  }

  displaySignup(): void {
    if (!this.signup) {
      this.signup = true;
    } else {
      this.signup = false;
    }
  }
}
