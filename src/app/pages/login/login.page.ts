import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public registrationForm: FormGroup;


  onSubmit() {
  }

  constructor(public formBuilder: FormBuilder, private router: Router,) {
    this.registrationForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
    
  }

  goToRegisterPage(){
    this.router.navigateByUrl('/register');
  }

}
