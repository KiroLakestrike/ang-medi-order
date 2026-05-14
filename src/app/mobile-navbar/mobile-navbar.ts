import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppConfig } from '../app-config';

@Component({
  selector: 'app-mobile-navbar',
  imports: [RouterLink],
  templateUrl: './mobile-navbar.html',
  styleUrl: './mobile-navbar.scss',
})
export class MobileNavbar {
  constructor(public config: AppConfig) {}
}
