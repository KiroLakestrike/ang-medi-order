import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import type { DoctorItem, DoctorList } from '../doctors.models';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';
import { ProfileList } from '../../profiles/profiles.model';

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

  onDeleteConfirmClick() {
    const oldList = this.storage.getJson<DoctorList>('doclist');
    const doctor = this.doctor;
    if (!oldList) return;

    const newList: DoctorList = {
      ...oldList,
      doctorItem: oldList.doctorItem.filter((item: DoctorItem) => item.uuid !== this.doctor().uuid),
    };

    this.storage.setJson('doclist', newList);
    this.mode = 'normal';
    this.reloadEvent.emit();
  }

  onSaveClick(form: NgForm) {
    if (form.invalid) return;

    const oldList: DoctorList = this.storage.getJson<DoctorList>('doclist') ?? { doctorItem: [] };

    const newList: DoctorList = {
      ...oldList,
      doctorItem: oldList.doctorItem.map((item) =>
        item.uuid === this.editDoctor.uuid ? this.editDoctor : item,
      ),
    };

    this.storage.setJson('doclist', newList);
    this.mode = 'normal';
    this.reloadEvent.emit();
  }

  onCancelClick(form: NgForm) {
    form.resetForm();
    this.editDoctor = this.createEditDoctor();
    this.mode = 'normal';
  }

  onDeleteCancelClick() {
    this.mode = 'normal';
  }
}
