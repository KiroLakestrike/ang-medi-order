import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DoctorCard } from './doctor-card/doctor-card';
import { HandleStorageService, RandomGenService } from '@kirolakestrike/lakestrike-services';
import type { DoctorItem, DoctorList } from './doctors.models';
import { ProfileItem } from '../profiles/profiles.model';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [FormsModule, DoctorCard],
  templateUrl: './doctors.html',
  styleUrl: './doctors.scss',
})
export class Doctors implements OnInit{
  constructor(
    public storage: HandleStorageService,
    private randomGen: RandomGenService,
  ) { }

  doctors: DoctorList = { doctorItem: [] };
  mode: 'normal' | 'new' = 'normal';

  newDoctor: DoctorItem = this.createEmptyDoctor();

  createEmptyDoctor() {
    return {
      uuid: '',
      title: '',
      lastName: '',
      description: '',
      gender: '',
    
      email: '',
      company: '',
    }
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctors = this.storage.getJson('doclist') ?? { doctorItem: [] };
  }

  reloadDoctors(): void {
    this.loadDoctors()
  }
}
