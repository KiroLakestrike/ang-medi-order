import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { MedicationItem } from '../medication.model';

@Component({
  selector: 'app-medication-card',
  imports: [MatIconModule],
  templateUrl: './medication-card.html',
  styleUrl: './medication-card.scss',
})
  
export class MedicationCard {
  @Input() medication!: MedicationItem;

  @Output() formChange = new EventEmitter<{
    mode: 'edit' | 'delete';
    medicationId: string;
    doctorId: string;
  }>();

  onEditClick(): void {
    this.formChange.emit({
      mode: 'edit',
      medicationId: this.medication.uuid,
      doctorId: this.medication.doctor,
    });
  }

  onDeleteClick(): void {
    this.formChange.emit({
      mode: 'delete',
      medicationId: this.medication.uuid,
      doctorId: this.medication.doctor,
    });
  }
}