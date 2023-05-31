import { Project } from "./project.model";
import { Education } from "./education.model";
import { Skill } from "./language.model";
import { WorkExperience } from "./work_experiences.model";

export interface Profile {
  id: number;
  image: string;
  first_name: string;
  last_name: string;
  bio: string;
  job: string;
  profile_photo: string;
  projects: Project[];
  educations: Education[];
  languages: Skill[];
  interests: object[];
  location: string;
  onboarded: boolean;
  following: Profile[];
  work_experiences: WorkExperience[];
}
