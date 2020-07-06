import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Todo } from '../models/Todo.model';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public helloWorldName(name: string = 'world'): Observable<string> {
    return this.http.get<{ message: string }>(`${API_URL}/hello-world-path-variable/${name}`)
      .pipe(
        map(response => response.message)
      );
  }

  public getTodos(name: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${API_URL}/users/${name}/todos`);
    // .pipe(
    //   tap(todos => console.log(todos))
    // );
  }

  public getTodo(name: string, id: number): Observable<Todo> {
    return this.http.get<Todo>(`${API_URL}/users/${name}/todos/${id}`);
  }

  public deleteTodo(name: string, id: number): Observable<object> {
    return this.http.delete(`${API_URL}/users/${name}/todos/${id}`);
  }

  public updateTodo(name: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${API_URL}/users/${name}/todos/${todo.id}`, todo);
  }

  public createTodo(name: string, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${API_URL}/users/${name}/todos`, todo);
  }

  public todoAlreadyExists(name: string, id: number, description: string): Observable<boolean> {
    return this.getTodos(name)
      .pipe(
        take(1),
        map(todos => {
          const foundTodos: Todo[] = todos.filter(todo => {
            if (todo.description.toUpperCase().trim() === description.toUpperCase().trim()) {
              if (id < 1 || id !== todo.id) {
                return todo;
              }
            }

            return null;
          });

          console.log('Found Todos: ', foundTodos);

          return foundTodos.length > 0;
        })
      );
  }
}
