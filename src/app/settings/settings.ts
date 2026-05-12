import { Component } from '@angular/core';
import { AppConfig } from '../app-config';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  constructor(
    public config: AppConfig,
    public storage: HandleStorageService,
  ) {}

  onColorChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log(value);

    // set localStorage to new value
    this.storage.setString('color-mode', value);
    this.config.colorMode = value;
  }
}
