import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as crypto from 'crypto-js';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');


  error: null | string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.loginForm = formBuilder.group({
      username: '' ,
      password: '',
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl
    });
  }

  async ngOnInit() {
    if (this.cookieService.check('token')) {
      this.router.navigate(['base']).finally(() => {/**/});

      this.http.get(environment.APIURL + 'api/verify', {headers: {token: this.cookieService.get('token')}})
        .subscribe((value: any) => {
          if (value.data.valid === true) {
            console.log('Verified');
          }
        },
          err => {
          console.log(err);
          this.router.navigate(['/']).finally(() => {/**/});
          });
    }
  }

  login() {
    if (!this.isValidForm()) {
      this.error = 'You must supply a valid username and password';
      return;
    }
    this.error = null;

    this.http.post(environment.APIURL + 'api/login',
      {username: this.loginForm.get('username').value,
        password: crypto.SHA256(this.loginForm.get('password').value)
          .toString()})
      .subscribe((value: {token}) => {
        const date = new Date();
        date.setHours(date.getHours() + 1);

        this.cookieService.set('token', value.token, date, '/', 'localhost', false, 'Strict');
      },
        err => {
          this.error = `Error ${err.status}: ${err.error}`;
        });
    this.loginForm.get('password').reset(true);
  }

  isValidForm(): boolean {
    if (this.loginForm.get('username').invalid || this.loginForm.get('password').invalid) { return false; }
    return this.loginForm.get('username').valid && this.loginForm.get('password').valid;
  }

}
