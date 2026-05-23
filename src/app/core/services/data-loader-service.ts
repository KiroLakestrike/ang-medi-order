import { Injectable } from '@angular/core';
import { HandleStorageService } from '@kirolakestrike/lakestrike-services';
import { ProfileList, ProfileItem } from '../../profiles/profiles.model';
import { DoctorList, DoctorItem } from '../../doctors/doctors.models';
import { MedicationList, MedicationItem } from '../../medications/medication.model';


@Injectable({
  providedIn: 'root',
})
export class DataLoaderService {
  constructor(public storage: HandleStorageService) { };

  readProfileList(): ProfileList {
    const stored = this.storage.getJson('proflist');
    if (!stored || !Array.isArray((stored as ProfileList).profileItem)) {
      return { profileItem:[] }
    }
    return stored as ProfileList;
  }

  readDoctorList(): DoctorList {
    const stored = this.storage.getJson('doclist');
    if (!stored || !Array.isArray((stored as DoctorList).doctorItem)) {
      return { doctorItem:[] }
    }
    return stored as DoctorList;
  }

  readMedicationList(): MedicationList {
    const stored = this.storage.getJson('medlist');
    if (!stored || !Array.isArray((stored as MedicationList).medicationItem)) {
      return { medicationItem:[] }
    }
    return stored as MedicationList;
  }
}
