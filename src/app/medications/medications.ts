import { Component, OnInit } from '@angular/core';
import { MedicationCard } from './medication-card/medication-card';
import { MedicationForm } from './medication-form/medication-form';
import { MedicationItem, MedicationList } from './medication.model';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';
import { DoctorList } from '../doctors/doctors.models';

@Component({
  selector: 'app-medications',
  imports: [MedicationCard, MedicationForm],
  templateUrl: './medications.html',
  styleUrl: './medications.scss',
})
export class Medications implements OnInit {
  constructor(private storage: HandleStorageService) {}
  mode: 'normal' | 'modal' = 'normal';
  medicationList: MedicationList = { medicationItem: [] };
  doctorList: DoctorList = { doctorItem: [] };

  

  ngOnInit(): void {
    this.loadMedications();
    this.loadDoctors();
  }

  loadMedications(): void {
    this.medicationList = this.storage.getJson('medlist') ?? { medicationItem: [] }
  }

  loadDoctors(): void {
    this.doctorList = this.storage.getJson('doclist') ?? { doctorItem: [] }
  }

  reloadMedications(): void {
    this.loadMedications();
  }

  onNewClick() {
    this.mode = 'modal';
  }
  
}
