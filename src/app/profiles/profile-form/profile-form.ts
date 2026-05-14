import { Component, input } from '@angular/core';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';
import type { ProfileItem } from '../profiles.model';



@Component({
  selector: 'app-profile-form',
  imports: [],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
})
export class ProfileForm {
  constructor(private storage: HandleStorageService) { }

  
}
