import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Todo } from '../models/Todo.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  message: string = null;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

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
        this.message = 'Successfully deleted todo';
        this.getTodos();

        setTimeout(this.removeMessage.bind(this), 3000);
      });
  }

  btnUpdateTodoClick(todoId: number) {
    this.router.navigate([todoId], { relativeTo: this.route });
  }

  btnCreateTodoClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  removeMessage() {
    this.message = null;
  }
}
