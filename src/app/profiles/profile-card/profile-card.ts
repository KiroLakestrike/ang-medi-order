import { Component, input, signal, effect, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import type { ProfileList, ProfileItem } from '../profiles.model';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';

@Component({
  selector: 'app-profile-card',
  // wichtig: standalone-Component, sonst greifen die imports hier nicht
  standalone: true,
  imports: [DatePipe, FormField],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Output() deleteEvent = new EventEmitter<void>();
  
  profile = input.required<ProfileItem>();

  // Model-Signal = Quelle der Wahrheit
  profileModel = signal<ProfileItem>({
    uuid: '',
    firstName: '',
    lastName: '',
    insuranceName: '',
    insuranceNumber: '',
    dateOfBirth: new Date(),
    email: '',
    phone: '',
    company: '',
    address: '',
    zip: '',
    place: '',
    description: '',
  });


  profileForm = form(this.profileModel);

  constructor(private storage: HandleStorageService) {
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
    const oldList = this.storage.getJson<ProfileList>('proflist');
    const profile = this.profile;
    if (!oldList) return;
  
    const newList: ProfileList = {
        ...oldList,
        profileItem: oldList.profileItem.filter(
          (item: ProfileItem) => item.uuid !== this.profile().uuid
        ),
      };
    
    this.storage.setJson('proflist', newList);
    this.mode = 'normal'
    this.deleteEvent.emit();
  }
}