export interface MedicationList {
  medicationItem: MedicationItem[];
}

export interface MedicationItem {
  uuid: string;
  name: string;
  symbol: string;
  amount: string;
  description: string;
  doctor: string;
}

