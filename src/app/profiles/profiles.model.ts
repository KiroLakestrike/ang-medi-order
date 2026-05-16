export interface ProfileItem {
  uuid: string;
  firstName: string;
  lastName: string;
  insuranceName: string;
  insuranceNumber: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  company: string;
  address: string;
  zip: string;
  place: string;
  description: string;
}

export interface ProfileList {
  profileItem: ProfileItem[];
}
