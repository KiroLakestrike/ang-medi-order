import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavBar } from './mobile-nav-bar/mobile-nav-bar';
import { AppConfig } from './app-config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MobileNavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('ang-medi-order');
  constructor(public config: AppConfig) {}
  
  ngOnInit(): void {
    this.config.loadSettings();
    
  }
}
