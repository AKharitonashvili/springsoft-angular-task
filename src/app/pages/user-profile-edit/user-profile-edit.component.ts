import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadComponent } from '../../shared/ui/inputs/file-upload/file-upload.component';
import { ProfileForm } from '../../shared/ui/interfaces/profile-form.interface';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button/button.component';
import { User } from '../../shared/ui/interfaces/user.interface';
import { UserActions, UserSelectors } from '../../shared/stores/user';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FileUploadComponent,
    ButtonComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileEditComponent implements OnInit {
  readonly router = inject(Router);
  readonly store = inject(Store);

  profileForm!: FormGroup<ProfileForm>;

  vm$: Observable<{ user?: User; loading: boolean; error: string | null }> =
    combineLatest([
      this.store.select(UserSelectors.selectUser),
      this.store.select(UserSelectors.selectUserLoading),
      this.store.select(UserSelectors.selectUserError),
    ]).pipe(
      map(([user, loading, error]) => ({ user, loading, error })),
      tap(({ user }) => {
        if (user) {
          const { profilePicture, ...restUser } = user;
          this.profileForm.patchValue(restUser);
        } else {
          this.profileForm.reset();
        }
      })
    );

  ngOnInit(): void {
    this.profileForm = new FormGroup<ProfileForm>({
      firstName: new FormControl<string | null>(null, Validators.required),
      lastName: new FormControl<string | null>(null, Validators.required),
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl<string | null>(null, [
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern('^[0-9]*$'),
      ]),
      profilePicture: new FormControl<File | null>(null),
    });

    this.store.dispatch(UserActions.loadUser());
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.profileForm.patchValue({
      profilePicture: file,
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }

  cancel(): void {
    this.router.navigate(['user-profile']);
  }
}
