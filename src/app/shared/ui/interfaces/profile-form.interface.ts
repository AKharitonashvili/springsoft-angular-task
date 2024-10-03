import { FormControl } from '@angular/forms';

export interface ProfileForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  profilePicture: FormControl<File | null>;
}
