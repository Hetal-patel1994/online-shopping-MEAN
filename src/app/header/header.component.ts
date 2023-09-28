import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private login: FormBuilder) {
    this.createLoginForm();
   }

   createLoginForm() {
    this.loginForm = this.login.group({
      Username: ['', Validators.required ],
    Password: ['', Validators.required ]
    });
    }

  ngOnInit() {

  
  }

}
