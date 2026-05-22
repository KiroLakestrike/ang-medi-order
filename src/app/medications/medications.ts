import { Component, OnInit } from '@angular/core';
import { MedicationCard } from './medication-card/medication-card';
import { MedicationForm } from './medication-form/medication-form';
import { MedicationItem, MedicationList } from './medication.model';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';

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

  ngOnInit(): void {
    this.loadMedications();
  }

  loadMedications(): void {
    this.medicationList = this.storage.getJson('medlist') ?? { medicationItem: [] }
  }

  reloadMedications(): void {
    this.loadMedications();
  }

  
}
