import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of, pipe } from 'rxjs';
import { User } from '../../ui/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly baseUrl = environment.apiBaseUrl;
  readonly http = inject(HttpClient);

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(delay(400));
  }

  public updateUser(user: User): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/users/${user.id}`, user)
      .pipe(delay(400));
  }
}
