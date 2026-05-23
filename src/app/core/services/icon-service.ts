import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private matIconRegistry = inject(MatIconRegistry);
  private domSenitizer = inject(DomSanitizer);

  init(): void {
    this.register('test');
  }

  private register(name: string): void {
    this.matIconRegistry.addSvgIcon(name, this.domSenitizer.bypassSecurityTrustResourceUrl(`/icons/${name}.svg`))
  }
  
}
