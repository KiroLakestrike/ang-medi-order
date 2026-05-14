import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfileCard } from './profile-card/profile-card';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';
import type { ProfileItem, ProfileList } from './profiles.model';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [FormsModule, ProfileCard],
  templateUrl: './profiles.html',
  styleUrl: './profiles.scss',
})
export class Profiles implements OnInit {
  constructor(public storage: HandleStorageService) {}

  profiles: ProfileList = { profileItem: [] };
  mode: 'normal' | 'new' = 'normal';

  newProfile: {
    firstName: string;
    lastName: string;
    insuranceName: string;
    insuranceNumber: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    zip: string;
    place: string;
    description: string;
  } = this.createEmptyProfile();

  ngOnInit(): void {
    this.profiles = this.storage.getJson('proflist') ?? { profileItem: [] };
    console.log(this.profiles);
  }

  createEmptyProfile() {
    return {
      firstName: '',
      lastName: '',
      insuranceName: '',
      insuranceNumber: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      zip: '',
      place: '',
      description: '',
    };
  }

  onNewClick() {
    this.newProfile = this.createEmptyProfile();
    this.mode = 'new';
  }

  onSaveClick(form: NgForm) {
    if (form.invalid) return;

    const stored: ProfileList = this.storage.getJson('proflist') ?? { profileItem: [] };

    const profileToSave: ProfileItem = {
      ...this.newProfile,
      dateOfBirth: new Date(this.newProfile.dateOfBirth),
    };

    stored.profileItem.push(profileToSave);

    this.storage.setJson('proflist', stored);
    this.profiles = stored;

    console.log(this.profiles);

    form.resetForm();
    this.newProfile = this.createEmptyProfile();
    this.mode = 'normal';
  }

  onCancelClick(form?: NgForm) {
    form?.resetForm();
    this.newProfile = this.createEmptyProfile();
    this.mode = 'normal';
  }
}
