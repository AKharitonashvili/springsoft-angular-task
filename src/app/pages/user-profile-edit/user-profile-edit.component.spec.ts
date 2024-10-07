import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileEditComponent } from './user-profile-edit.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UserActions, UserSelectors } from '../../shared/stores/user';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../shared/ui/interfaces/user.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '1234567890',
    profilePicture: new File([''], 'profile.png', { type: 'image/png' }),
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        UserProfileEditComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: UserSelectors.selectUser, value: null },
            { selector: UserSelectors.selectUserLoading, value: false },
            { selector: UserSelectors.selectUserError, value: null },
          ],
        }),
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on component init', () => {
    component.ngOnInit();
    expect(component.profileForm.contains('firstName')).toBe(true);
    expect(component.profileForm.contains('lastName')).toBe(true);
    expect(component.profileForm.contains('email')).toBe(true);
    expect(component.profileForm.contains('phoneNumber')).toBe(true);
    expect(component.profileForm.contains('profilePicture')).toBe(true);
  });

  it('should dispatch loadUser action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUser());
  });

  it('should navigate to user-profile on cancel', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['user-profile']);
  });

  // Test form pre-populating
  it('should successfully pre-populate form data after user data loads', () => {
    store.overrideSelector(UserSelectors.selectUser, mockUser);
    store.refreshState();
    fixture.detectChanges();

    expect(component.profileForm.value.firstName).toBe(mockUser.firstName);
    expect(component.profileForm.value.lastName).toBe(mockUser.lastName);
    expect(component.profileForm.value.email).toBe(mockUser.email);
    expect(component.profileForm.value.phoneNumber).toBe(mockUser.phoneNumber);
    expect(component.profileForm.value.profilePicture).toBe(
      mockUser.profilePicture
    );
  });

  // Successal submission
  it('should dispatch updateUser action on form submit', () => {
    spyOn(store, 'dispatch');
    component.profileForm.setValue({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      phoneNumber: mockUser.phoneNumber,
      profilePicture: mockUser.profilePicture,
    });

    component.onSubmit(mockUser.id);
    expect(store.dispatch).toHaveBeenCalledWith(
      UserActions.updateUser({ user: mockUser })
    );
  });
});
