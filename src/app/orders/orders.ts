import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../core/services/data-loader-service';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';
import { ProfileList, ProfileItem } from '../profiles/profiles.model';
import { DoctorList, DoctorItem } from '../doctors/doctors.models';
import { MedicationList, MedicationItem } from '../medications/medication.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  basicMailText = 'Sehr geehrte Testmail';

  profileList!: ProfileList;
  doctorList!: DoctorList;
  medicationList!: MedicationList;

  activeProfile: ProfileItem = {
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
  
  activeDoctor: DoctorItem = {
    uuid: '',
    title: '',
    lastName: '',
    description: '',
    gender: '',
    email: '',
    company: '',
  };

  constructor(
    private dataLoader: DataLoaderService,
    private storage: HandleStorageService,
  ) {}

  ngOnInit(): void {
    this.profileList = this.dataLoader.readProfileList();
    this.doctorList = this.dataLoader.readDoctorList();
    this.medicationList = this.dataLoader.readMedicationList();
  }

  onSelectProfile(profile: ProfileItem) {
    this.activeProfile = profile;
  }

  onSelectDoctor(doctor: DoctorItem) {
    this.activeDoctor = doctor;
  }

  resetSelectedProfile() {
    this.activeProfile = {
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

    this.resetSelectedDoctor();
    
  }

  resetSelectedDoctor() {
    this.activeDoctor = {
      uuid: '',
      title: '',
      lastName: '',
      description: '',
      gender: '',
      email: '',
      company: '',
    };
  }

}
