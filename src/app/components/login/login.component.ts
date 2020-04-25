import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
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
    if (this.username === 'admin' && this.password === 'admin') {
      // TODO Router
    } else {
      alert('Invalid Creds');
    }
  }

}
