import { Component, EventEmitter, input, Output, effect } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HandleStorageService, RandomGenService } from '@kirolakestrike/lakestrike-services';
import type { MedicationItem, MedicationList } from '../medication.model';
import { DataLoaderService } from '../../core/services/data-loader-service';

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
    private loader: DataLoaderService,
    private randomGen: RandomGenService,
  ) {
    effect(() => {
      const mode = this.mode();
      const medication = this.selectedMedication();

      if (mode === 'edit' && medication) {
        this.medicationItem = { ...medication };
      }

      if (mode === 'new') {
        this.resetFormData();
      }
    });
  }

  @Output() reloadEvent = new EventEmitter<void>();

  mode = input.required<'none' | 'new' | 'edit' | 'delete'>();
  doctor = input.required<string>();
  selectedMedication = input<MedicationItem | null>(null);

  medicationItem: MedicationItem = this.createEmptyMedication();

  private resetFormData(): void {
    this.medicationItem = this.createEmptyMedication();
  }

  private createEmptyMedication() {
    return {
      uuid: '',
      name: '',
      symbol: '',
      amount: '',
      description: '',
      doctor: '',
    };
  }

  createMedication(): void {
    const newMedication: MedicationItem = {
      ...this.medicationItem,
      uuid: this.randomGen.getUUIDv7(),
      doctor: this.doctor(),
    };

    const stored: MedicationList = this.loader.readMedicationList();

    stored.medicationItem.push(newMedication);
    this.storage.setJson('medlist', stored);
    this.resetFormData();
    this.reloadEvent.emit();
  }

  updateMedication(): void {
    const oldList: MedicationList = this.loader.readMedicationList();

    const newList: MedicationList = {
      ...oldList,
      medicationItem: oldList.medicationItem.map((item) =>
        item.uuid === this.medicationItem.uuid
          ? { ...this.medicationItem, doctor: this.doctor() }
          : item,
      ),
    };

    this.storage.setJson('medlist', newList);
    this.reloadEvent.emit();
  }

  submitForm(form: NgForm): void {
    if (form.invalid) return;

    if (this.mode() === 'new') {
      this.createMedication();
    }

    if (this.mode() === 'edit') {
      this.updateMedication();
    }
  }

  @Output() cancelEvent = new EventEmitter<void>();

  cancelClick(form: NgForm): void {
    this.resetFormData();
    form.resetForm(this.createEmptyMedication());
    this.cancelEvent.emit();
  }

  confirmDelete(): void {
    const oldList: MedicationList = this.loader.readMedicationList();
    const medication = this.selectedMedication();

    if (!medication) return;

    const newList: MedicationList = {
      ...oldList,
      medicationItem: oldList.medicationItem.filter(
        (item: MedicationItem) => item.uuid !== medication.uuid,
      ),
    };

    this.storage.setJson('medlist', newList);
    this.reloadEvent.emit();
  }

  cancelDelete(): void {
    this.cancelEvent.emit();
  }
}
