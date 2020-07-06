import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Todo } from '../models/Todo.model';
import { ApiService } from '../services/api.service';
import { MessageService } from '../services/message.service';
import { Message } from '../models/Message.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.api.getTodos('Jarrod')
      .subscribe(todos => this.todos = todos);
  }

  btnDeleteTodoClick(todoId: number) {
    this.api.deleteTodo('Jarrod', todoId)
      .subscribe(() => {
        this.messageService.sendMessage(new Message('Successfully deleted todo'));
        this.getTodos();
      });
  }

  btnUpdateTodoClick(todoId: number) {
    this.router.navigate([todoId], { relativeTo: this.route });
  }

  btnCreateTodoClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
