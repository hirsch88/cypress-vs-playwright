import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BalButton, BalFormBundle, BalHeading, BalLayoutBundle } from '@baloise/ds-angular';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ...BalLayoutBundle, BalHeading, BalButton, ...BalFormBundle],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  date = signal('')

  setToday() {
    this.date.set('2024-10-21')
  }
}
