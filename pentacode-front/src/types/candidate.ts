export interface Candidate {
  id: number;
  name: string;
  party: string;
  number: number;
  photoUrl: string;
  position: string;
  region?: string;
  birthDate?: string;
  birthPlace?: string;
  nationality?: string;
  education?: Education[];
  experience?: Experience[];
  proposals?: Proposal[];
}

export interface Education {
  institution: string;
  degree: string;
  country?: string;
}

export interface Experience {
  title: string;
  organization: string;
  period: string;
}

export interface Proposal {
  sector: string;
  description: string;
  icon?: string;
}
