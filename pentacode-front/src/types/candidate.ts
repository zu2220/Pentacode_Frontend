export interface Candidate {
  id: number;
  name: string;
  party: string;
  number: number;
  photoUrl: string;
  position: string;
  region?: string;
  biography?: string;
  experience?: Array<{
    role: string;
    organization: string;
    period: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  proposals?: string[];
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };

}
