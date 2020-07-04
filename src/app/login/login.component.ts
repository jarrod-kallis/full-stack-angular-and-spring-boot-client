import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  validCredentials: boolean;
  loginAttempted = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.authService.authenticated$.subscribe(authenticated => {
      this.validCredentials = authenticated;

      if (this.validCredentials === true) {
        this.router.navigateByUrl('welcome');
      }
    });
  }

  submit() {
    this.authService.login(this.form.value.username, this.form.value.password);
    this.loginAttempted = true;
  }
}
