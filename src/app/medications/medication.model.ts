export interface MedicationList {
  medicationItem: MedicationItem[];
}

export interface MedicationItem {
  name: string;
  symbol: string;
  amount: string;
  description: string;
  doctor: string;
}

