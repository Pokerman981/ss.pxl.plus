import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as crypto from 'crypto-js';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cookieService: CookieService, private router: Router, private authService: AuthService) {
    this.loginForm = formBuilder.group({
      username: '' ,
      password: '',
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl
    });
  }

  async ngOnInit() {

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
        console.log('Set Cookie');

        this.cookieService.set('token', value.token, 1, '/', 'localhost', false);
        this.router.navigate(['/base']).finally(() => {/**/});
        },
        err => {
          this.error = `Error ${err.status}: ${err.error}`;
        });
  }

  isValidForm(): boolean {
    if (this.loginForm.get('username').invalid || this.loginForm.get('password').invalid) { return false; }
    return this.loginForm.get('username').valid && this.loginForm.get('password').valid;
  }

}
