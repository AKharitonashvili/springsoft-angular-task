import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../ui/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
