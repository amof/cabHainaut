import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../share/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('fform') loginFormDirective;
  hidePassword = true;


  formErrors = {
    email: '',
    password: ''
  };

  validationMessages = {
    email: {
        required: 'Email is required.',
        email: 'Please enter a valid email.'
    },
    password: {
        required: 'Password is required.'
    }
  };

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();

    this.authService.isLoggedIn().subscribe((result) => {
      if (result) {
          this.router.navigate(['admin']);
      }
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) { // ? means optional
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
  }

  onSubmit(): void {
    this.authService.SignIn(this.loginForm.value);
  }

}
