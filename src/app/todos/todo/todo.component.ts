import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { map, take, filter, tap, switchMap } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { Todo } from '../../models/Todo.model';
import { futureDateValidator } from '../../validators/date.validator';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/Message.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  NEW = 'new';
  form: FormGroup;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => +params.id),
        // Only continue the observable chain if we find an id in the URL
        filter(id => {
          const isNewTodo = isNaN(id);

          this.form = this.formBuilder.group({
            id: [isNewTodo ? -1 : id],
            description: ['', [Validators.required], this.todoAlreadyExists.bind(this)],
            targetDate: [moment().format('YYYY-MM-DD'), [Validators.required, futureDateValidator()]],
            completed: [false]
          });

          return !isNewTodo;
        })
      )
      .subscribe(id => this.api.getTodo('Jarrod', id)
        .pipe(
          take(1)
        )
        .subscribe(todo => {
          this.form.patchValue({
            ...todo,
            targetDate: moment(todo.targetDate).format('YYYY-MM-DD')
          });
        }));
  }

  submit() {
    // console.log(this.form.value);
    let save$: Observable<Todo>;

    if (this.form.value.id === -1) {
      save$ = this.api.createTodo('Jarrod', this.form.value);
    } else {
      save$ = this.api.updateTodo('Jarrod', this.form.value);
    }

    save$
      .subscribe(() => {
        this.messageService.sendMessage(new Message(`Todo successfully ${this.form.value.id === -1 ? 'created' : 'updated'}`));
        this.navigateBackToTodoList();
      });
  }

  btnClick() {
    this.navigateBackToTodoList();
  }

  navigateBackToTodoList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  todoAlreadyExists = (formControl: FormControl): Observable<{ [s: string]: boolean }> => {
    // Debounce the network requests for async validators
    return timer(500)
      .pipe(
        switchMap(() => {
          return this.api.todoAlreadyExists('Jarrod', this.form.value.id, formControl.value)
            .pipe(
              map(invalid => {
                if (invalid) {
                  return { todoExists: true };
                } else {
                  return null;
                }
              })
            );
        })
      );
  }
}
