import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userUrl = environment.API_ENDPOINT + 'users/login';

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.userUrl, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user.userId && user.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('currentUsername', username);
        }
        return user;
      }));
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUsername');
  }

}
