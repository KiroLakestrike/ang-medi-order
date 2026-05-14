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

  // TODO: Not too happy with the color and brightness changers.
  // Need to add a way to pop the newly active from

  // Color Change Settings
  onColorChange(value: string, list: string[]) {

    // we remove the given value from the array,
    const newList = this.removeItemOnce([...list], value);
    console.log(value);

    // remove old classes
    document.body.classList.remove(...newList);
    document.body.classList.add(value);

    // set localStorage and config to new value
    this.storage.setString('color-mode', value);
    this.config.colorMode.set(value);
  }

  // brightness change settings

  onBrightnessChange(value: string, list: string[]) {
    const newList = this.removeItemOnce([...list], value);
    console.log(value);

    document.body.classList.remove(...newList);
    document.body.classList.add(value);

    this.storage.setString('brightness-mode', value);
    this.config.colorMode.set(value);
}

  private removeItemOnce(arr: string[], value: string) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
