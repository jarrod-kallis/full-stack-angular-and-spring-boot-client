import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  helloWorldMessage: string;
  errorMessage: string = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  btnHelloWorldClick() {
    this.api.helloWorldName('Jarrod')
      .subscribe(
        message => {
          this.helloWorldMessage = message;
          this.errorMessage = null;
        },
        error => this.errorMessage = error.error.message
      );
  }
}
