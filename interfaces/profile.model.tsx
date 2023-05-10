import { Project } from "./project.model";
import { Education } from "./education.model";
import { Skill } from "./language.model";

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  bio: string;
  job: string;
  profile_photo: string;
  projects: Project[];
  educations: Education[];
  languages: Skill[];
  location: string;
  onboarded: boolean;
  following: Profile[];
}
