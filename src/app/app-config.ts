import { Injectable } from '@angular/core';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  // Basic App Settings
  constructor(public storage: HandleStorageService) {}

  colorMode: null | string = 'blue';
  brightnessMode: null | string = 'dark';

  loadSettings(): void {
    // once loaded and set, set the applications color config.
    this.loadColorSettings();
    this.loadBrightnessSettings()
  }

  loadColorSettings() {
    // Load color Settings from local storage if available, if not, set it to default 'blue'
    let colorMode = this.storage.getString('color-mode');
    if (colorMode === null) {
      this.storage.setString('color-mode', 'blue');
      colorMode === 'blue';
    }

    this.colorMode = colorMode;
  }

  loadBrightnessSettings() {
    // Load brightness settings from local storage if available, if not, set it to default 'dark'
    let brightnessMode = this.storage.getString('brightness-mode');
    if (brightnessMode === null) {
      this.storage.setString('brightness-mode', 'dark');
      brightnessMode === 'dark';
    }
  }
}
