import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // message$: Observable<string> = null;

  constructor(private authService: AuthService, protected messageService: MessageService) { }

  ngOnInit(): void {
    this.authService.autoLogin();

    // this.message$ = this.messageService.message$;
  }
}
