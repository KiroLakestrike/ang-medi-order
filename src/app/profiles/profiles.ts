import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfileCard } from './profile-card/profile-card';
import { HandleStorageService, RandomGenService } from '@kirolakestrike/lakestrike-services';
import type { ProfileItem, ProfileList } from './profiles.model';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [FormsModule, ProfileCard],
  templateUrl: './profiles.html',
  styleUrl: './profiles.scss',
})
export class Profiles implements OnInit {
  constructor(
    public storage: HandleStorageService,
    private randomGen: RandomGenService,
  ) {}

  profiles: ProfileList = { profileItem: [] };
  mode: 'normal' | 'new' = 'normal';

  newProfile: {
    uuid: string;
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
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profiles = this.storage.getJson('proflist') ?? { profileItem: [] };
  }

  reloadProfiles(): void {
    this.loadProfiles();
  }

  createEmptyProfile() {
    return {
      uuid: '',
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
      uuid: this.randomGen.getUUIDv7(),
    };

    stored.profileItem.push(profileToSave);

    this.storage.setJson('proflist', stored);
    this.profiles = stored;

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
