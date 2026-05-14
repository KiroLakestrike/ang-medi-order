import { Component, input, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';

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
  selector: 'app-profile-card',
  // wichtig: standalone-Component, sonst greifen die imports hier nicht
  standalone: true,
  imports: [DatePipe, FormField],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  profile = input.required<ProfileItem>();

  // Model-Signal = Quelle der Wahrheit
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

  constructor() {
    effect(() => {
      const p = this.profile();
      this.profileModel.set(p);
    });
  }

  mode: 'normal' | 'edit' | 'delete' = 'normal';

  onEditClick() {
    this.mode = 'edit';
  }

  onSaveClick() {
    const updatedProfile = this.profileModel();
    console.log('Updated profile', updatedProfile);
    this.mode = 'normal';
  }

  onCancelClick() {
    this.profileModel.set(this.profile());
    this.mode = 'normal';
  }

  onDeleteClick() {
    this.mode = 'delete';
  }

  onDeleteConfirmClick() {
    this.mode = 'normal';
  }
}