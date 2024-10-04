import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../ui/interfaces/user.interface';
import { environment } from '../../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a user via GET', done => {
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      profilePicture: new File([''], 'profile.png', { type: 'image/png' }),
    };

    service.getUser().subscribe(user => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update a user via PATCH', done => {
    const mockUser: User = {
      id: '1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '9876543210',
      profilePicture: new File([''], 'profile.png', { type: 'image/png' }),
    };

    service.updateUser(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/users/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });
});
