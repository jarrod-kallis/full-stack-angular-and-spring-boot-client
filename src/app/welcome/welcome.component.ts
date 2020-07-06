import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';
import { MessageService } from '../services/message.service';
import { Message, MessageType } from '../models/Message.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  helloWorldMessage: string;
  // errorMessage: string = null;

  constructor(private api: ApiService, private messageService: MessageService) { }

  ngOnInit() {
  }

  btnHelloWorldClick() {
    this.api.helloWorldName('Jarrod')
      .subscribe(
        message => {
          this.helloWorldMessage = message;
          // this.errorMessage = null;
        },
        error => {
          // this.errorMessage = error.error.message ? error.error.message : error.statusText;
          this.messageService.sendMessage(new Message(error.error.message ? error.error.message : error.statusText, MessageType.Error));
        }
      );
  }
}
