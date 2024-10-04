import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UserActions, UserSelectors } from '../../shared/stores/user';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { User } from '../../shared/ui/interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImgFallBackDirective } from '../../shared/directives/img-fall-back.directive';
import { PhoneNumberPipe } from '../../shared/pipes/phone-number/phone-number.pipe';
import { ButtonComponent } from '../../shared/ui/button/button/button.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let store: MockStore;
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserComponent,
        MatIconModule,
        MatProgressSpinnerModule,
        ImgFallBackDirective,
        PhoneNumberPipe,
        ButtonComponent,
        RouterModule,
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: UserSelectors.selectUser, value: null },
            { selector: UserSelectors.selectUserLoading, value: false },
            { selector: UserSelectors.selectUserError, value: null },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (param: string) => 'mockId',
            }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch UserActions.loadUser on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUser());
  });

  it('should display loading spinner when loading', () => {
    store.overrideSelector(UserSelectors.selectUserLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should display error message when there is an error', () => {
    const errorMessage = 'Error loading user';
    store.overrideSelector(UserSelectors.selectUserError, errorMessage);
    store.refreshState();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('mat-error'));
    expect(error.nativeElement.textContent).toContain(errorMessage);
  });

  it('should display user information and edit button when user data is available', () => {
    const user: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      profilePicture: new File([''], 'profile.png', { type: 'image/png' }),
    };
    store.overrideSelector(UserSelectors.selectUser, user);
    store.refreshState();
    fixture.detectChanges();

    const userName = fixture.debugElement.query(By.css('h3'));
    expect(userName.nativeElement.textContent).toContain('John Doe');

    const email = fixture.debugElement.query(By.css('p.text-neutral-600'));
    expect(email.nativeElement.textContent).toContain('john.doe@example.com');

    const phone = fixture.debugElement.query(By.css('p.text-neutral-600 + p'));
    expect(phone.nativeElement.textContent.trim()).toContain('+ 123 456 789');

    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
  });
});
