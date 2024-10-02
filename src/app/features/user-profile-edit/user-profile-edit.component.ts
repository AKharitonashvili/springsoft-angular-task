import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

interface ProfileForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  profilePicture: FormControl<File | null>;
}

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FileUploadComponent,
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileEditComponent implements OnInit {
  profileForm!: FormGroup<ProfileForm>;

  ngOnInit(): void {
    this.profileForm = new FormGroup<ProfileForm>({
      firstName: new FormControl<string | null>(null, Validators.required),
      lastName: new FormControl<string | null>(null, Validators.required),
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl<string | null>(null),
      profilePicture: new FormControl<File | null>(null),
    });
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
}
