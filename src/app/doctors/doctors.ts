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

  private readDoctorList(): DoctorList {
    const stored = this.storage.getJson('docList');
    if (!stored || !Array.isArray((stored as DoctorList).doctorItem)) {
      return { doctorItem: [] };
    }
    return stored as DoctorList;
  }

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
  };

  ngOnInit(): void {
    this.loadDoctors();
  };

  loadDoctors(): void {
    this.doctors = this.readDoctorList();
  };

  reloadDoctors(): void {
    this.loadDoctors()
  };

  onNewClick() {
    this.newDoctor = this.createEmptyDoctor();
    this.mode = 'new';
  };

  onSaveClick(form: NgForm) {
    if (form.invalid) return;

    const stored: DoctorList = this.readDoctorList();

    const doctorToSave: DoctorItem = {
      ...this.newDoctor,
      uuid: this.randomGen.getUUIDv7(),
    };

    stored.doctorItem.push(doctorToSave);

    this.storage.setJson('doclist', stored)
    this.doctors = stored;

    form.resetForm();
    this.newDoctor = this.createEmptyDoctor();
    this.mode = 'normal';
  };

  onCancelClick(form: NgForm) {
    form.resetForm();
    this.newDoctor = this.createEmptyDoctor();
    this.mode = 'normal';
  };
}
