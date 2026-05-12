import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppConfig } from '../app-config';

@Component({
  selector: 'app-mobile-nav-bar',
  imports: [RouterLink],
  templateUrl: './mobile-nav-bar.html',
  styleUrl: './mobile-nav-bar.scss',
})
export class MobileNavBar {
  constructor(public config: AppConfig) { }

  
}
