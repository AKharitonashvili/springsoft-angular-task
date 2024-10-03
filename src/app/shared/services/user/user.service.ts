import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from '../../ui/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`).pipe(delay(100));
  }
}
