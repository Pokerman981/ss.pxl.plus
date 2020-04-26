import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = formBuilder.group({
      username: '',
      password: '',
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl
    });
  }


  ngOnInit(): void {
  }

  login() {
    this.http.post('https://pxl.plus:420/api/login', {username: 'username', password: 'Password1'})
      .subscribe(value => {
        console.log(value);
      });
  }

}
