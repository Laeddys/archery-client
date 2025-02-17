export interface IClub {
  id: number;
  name: string;
  established: number;
  legal_form: string;
  registration_number: string;
  bank: string;
  legal_address: string;
  trainingInWinter: string;
  trainingInSummer: string;
  filial_branch: string;
  manager: string;
  coach_staff: string[];
  phone: string;
  mail: string;
  website: string;
  socialMedia: string;
  notes: string;
  athletes_count: number;
}
