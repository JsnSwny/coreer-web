import { Profile } from "./profile.model";

export interface School {
  id: number;
  logo: string;
  name: string;
  country: string;
}

export interface Education {
  id: number;
  school: School;
  degree: string;
  description: string;
  start_date: string;
  end_date: string | null;
  user: Profile;
}

export interface EducationRequest {
  school_id: number;
  degree: string;
  description: string;
  start_date: string;
  end_date: string | null;
  user: number;
}
