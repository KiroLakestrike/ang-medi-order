import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HandleStorageService, RandomGenService } from '@kirolakestrike/lakestrike-services';
import type { MedicationItem } from '../medication.model';

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medication-form.html',
  styleUrl: './medication-form.scss',
})
export class MedicationForm {
  constructor(
    private storage: HandleStorageService,
    private randomGen: RandomGenService,
  ) {}

  @Output() reloadEvent = new EventEmitter<void>();

  mode = input.required<'none' | 'new' | 'edit' | 'delete'>();
  doctor = input.required<string>();
  medicationId = input<string>('');

  medicationItem: MedicationItem = {
    uuid: '',
    name: '',
    symbol: '',
    description: '',
    doctor: '',
    amount: '',
  };
}
