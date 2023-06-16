import { Profile } from "./profile.model";

export interface WorkExperience {
  id: number;
  user: Profile;
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface WorkExperienceRequest {
  user: number;
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  description?: string | undefined;
}
