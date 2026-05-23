import { Component, OnInit } from '@angular/core';
import { MedicationCard } from './medication-card/medication-card';
import { MedicationForm } from './medication-form/medication-form';
import { MedicationList } from './medication.model';
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
  formMode: 'none' | 'new' | 'edit' | 'delete' = 'none';

  activeDoctor = '';
  activeMedication = '';

  medicationList: MedicationList = { medicationItem: [] };
  doctorList: DoctorList = { doctorItem: [] };

  private readDoctorList(): DoctorList {
    const stored = this.storage.getJson('doclist');
    if (!stored || !Array.isArray((stored as DoctorList).doctorItem)) {
      return { doctorItem: [] };
    }
    return stored as DoctorList;
  }

  private readMedicationList(): MedicationList {
    const stored = this.storage.getJson('medlist');
    if (!stored || !Array.isArray((stored as MedicationList).medicationItem)) {
      return { medicationItem: [] };
    }
    return stored as MedicationList;
  }

  ngOnInit(): void {
    this.loadMedications();
    this.loadDoctors();
  }

  loadMedications(): void {
    this.medicationList = this.readMedicationList();
  }

  loadDoctors(): void {
    this.doctorList = this.readDoctorList();
  }

  reloadMedications(): void {
    this.loadMedications();
  }

  onNewClick(uuid: string): void {
    this.mode = 'modal';
    this.formMode = 'new';
    this.activeDoctor = uuid;
    this.activeMedication = '';
  }

  onFormChange(event: { mode: 'edit' | 'delete'; medicationId: string; doctorId: string }): void {
    this.mode = 'modal';
    this.formMode = event.mode;
    this.activeMedication = event.medicationId;
    this.activeDoctor = event.doctorId;
  }
}
