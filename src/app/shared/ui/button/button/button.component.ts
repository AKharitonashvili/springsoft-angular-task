import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() icon?: string;
  @Input() type: 'primary' | 'warn' | 'info' = 'primary';
  @Input() disabled?: boolean;
}
