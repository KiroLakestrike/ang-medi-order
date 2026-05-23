export interface DoctorItem {
  uuid: string;
  title: string;
  lastName: string;
  description: string;
  gender: string;

  email: string;
  company: string;
}

export interface DoctorList {
  doctorItem: DoctorItem[];
}
