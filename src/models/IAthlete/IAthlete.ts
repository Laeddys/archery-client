export interface IAthlete {
  id: number;
  name: string;
  date_of_birth: string | string[];
  gender: string;
  club_id: number;
  "class/subclass": string;
  role: string;
  ranking: number;
  club: {
    name: string;
    id: number;
    established: number;
    legal_form: string;
    registration_number: string;
    bank: string;
    legal_address: string;
    trainingInWinter: string;
    trainingInSummer: string;
    filial_branch: string;
    manager: string;
    coach_staff: string;
    phone: string;
    mail: string;
    website: string;
    socialMedia: string;
    notes: string;
    athletes_count: number;
  };
}
