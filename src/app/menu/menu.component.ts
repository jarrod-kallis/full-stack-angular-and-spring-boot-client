import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  authenticated$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authenticated$ = this.authService.authenticated$;
  }
}
