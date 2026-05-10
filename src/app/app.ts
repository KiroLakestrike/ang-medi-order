import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profiles } from './profiles/profiles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Profiles],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ang-medi-order');
}
