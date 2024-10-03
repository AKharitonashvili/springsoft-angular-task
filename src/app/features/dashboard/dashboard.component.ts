import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions, UserSelectors } from '../../shared/stores/user';
import { combineLatest, map, Observable } from 'rxjs';
import { User } from '../../shared/ui/interfaces/user.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  readonly store = inject(Store);

  vm$: Observable<{ users: User[] }> = combineLatest([
    this.store.select(UserSelectors.selectAllUsers),
  ]).pipe(map(([users]) => ({ users })));

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }
}
