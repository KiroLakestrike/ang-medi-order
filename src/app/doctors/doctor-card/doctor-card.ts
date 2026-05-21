import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import type { DoctorItem, DoctorList } from '../doctors.models';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';

@Component({
  selector: 'app-doctor-card',
  imports: [FormsModule],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.scss',
})
export class DoctorCard {
  @Output() reloadEvent = new EventEmitter<void>();

  doctor = input.required<DoctorItem>();

  editDoctor: DoctorItem = {
    uuid: '',
    title: '',
    lastName: '',
    description: '',
    gender: '',
    email: '',
    company: '',
  };

  constructor(private storage: HandleStorageService) {}
  mode: 'normal' | 'edit' | 'delete' = 'normal';

  createEditDoctor(): DoctorItem {
    const doctor = this.doctor();

    return { ...doctor };
  }

  onEditClick() {
    this.editDoctor = this.createEditDoctor();
    this.mode = 'edit';
  }

  onDeleteClick() {
    this.mode = 'delete';
  }

  onDeleteContirmClick() {}

  onSaveClick(form: NgForm) {}
}
