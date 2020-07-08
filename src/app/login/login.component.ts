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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.authService.isAuthenticated()) {
      this.gotoWelcomePage();
    }
  }

  submit() {
    this.authService.login(this.form.value.username, this.form.value.password)
      .subscribe(
        () => this.gotoWelcomePage(),
        () => this.messageService.sendMessage(new Message('Invalid Credentials', MessageType.Warning))
      );
  }

  gotoWelcomePage() {
    this.router.navigateByUrl('welcome');
  }
}
