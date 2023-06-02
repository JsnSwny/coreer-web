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
  start_date: Date;
  end_date?: Date;
  user: Profile;
}

export interface EducationRequest {
  school_id: number;
  degree: string;
  start_date: string;
  end_date?: string;
  user: number;
}
