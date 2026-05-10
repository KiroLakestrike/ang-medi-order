import { Component, input, signal, effect, OnInit } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ProfileCard } from '../profile-card/profile-card';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';

type ProfileList = {
  profileItem: ProfileItem[];
};

type ProfileItem = {
  firstName: string;
  lastName: string;
  insuranceName: string;
  insuranceNumber: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  company: string;
  adress: string;
  zip: string;
  place: string;
  description: string;
};

@Component({
  selector: 'app-profiles',
  imports: [ProfileCard, FormField],
  templateUrl: './profiles.html',
  styleUrl: './profiles.scss',
})
export class Profiles implements OnInit {
  constructor(public storage: HandleStorageService) {}
  
  profiles: null | ProfileList = null;
  mode: 'normal' | 'new' = 'normal';

  ngOnInit(): void {
    this.profiles = this.storage.getJson('proflist');
    console.log(this.profiles);
  }


  profileModel = signal<ProfileItem>({
    firstName: '',
    lastName: '',
    insuranceName: '',
    insuranceNumber: '',
    dateOfBirth: new Date(),
    email: '',
    phone: '',
    company: '',
    adress: '',
    zip: '',
    place: '',
    description: '',
  });


  profileForm = form(this.profileModel);


  onNewClick() {
    this.mode = 'new';
  }

  onSaveClick() {
    const updatedProfile = this.profileModel();
    console.log('Updated profile', updatedProfile);
    this.mode = 'normal';
  }

  onCancelClick() {
    this.mode = 'normal';
  }
}
