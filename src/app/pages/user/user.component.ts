import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ImgFallBackDirective } from '../../shared/directives/img-fall-back.directive';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserActions, UserSelectors } from '../../shared/stores/user';
import { combineLatest, map, Observable } from 'rxjs';
import { User } from '../../shared/ui/interfaces/user.interface';
import { PhoneNumberPipe } from '../../shared/pipes/phone-number/phone-number.pipe';
import { ButtonComponent } from '../../shared/ui/button/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ImgFallBackDirective,
    AsyncPipe,
    PhoneNumberPipe,
    ButtonComponent,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  readonly store = inject(Store);

  vm$: Observable<{ user?: User; loading: boolean; error: string | null }> =
    combineLatest([
      this.store.select(UserSelectors.selectUser),
      this.store.select(UserSelectors.selectUserLoading),
      this.store.select(UserSelectors.selectUserError),
    ]).pipe(map(([user, loading, error]) => ({ user, loading, error })));

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUser());
  }
}
