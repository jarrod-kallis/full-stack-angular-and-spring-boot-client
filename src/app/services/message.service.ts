import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Message } from '../models/Message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<Message>();
  private _message$ = this.messageSubject.asObservable();

  constructor() { }

  public get message$(): Observable<Message> {
    return this._message$;
  }

  public sendMessage(message: Message) {
    this.messageSubject.next(message);

    setTimeout(this.removeMessage.bind(this), 3000);
  }

  private removeMessage() {
    this.messageSubject.next(null);
  }
}
