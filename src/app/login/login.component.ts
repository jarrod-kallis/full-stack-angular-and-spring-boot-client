import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { Message, MessageType } from '../models/Message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  // message: string;
  loginAttempted = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.authService.authenticated$.subscribe(authenticated => {
      if (authenticated === true) {
        this.router.navigateByUrl('welcome');
      } else if (this.loginAttempted === true) {
        // this.message = 'Invalid Credentials';
        this.messageService.sendMessage(new Message('Invalid Credentials', MessageType.Warning));
      }
    });
  }

  submit() {
    this.loginAttempted = true;
    // this.message = null;
    this.authService.login(this.form.value.username, this.form.value.password);
  }
}
