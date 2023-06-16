import { Education } from "./education.model";
import { Interest } from "./interest.model";
import { Skill } from "./language.model";
import { Project } from "./project.model";
import { UserAnswer } from "./question.model";
import { WorkExperience } from "./work_experiences.model";

export interface CareerLevel {
  id: number;
  name: string;
  level_type: "S" | "P";
}
export interface Profile {
  id: number;
  username: string;
  image: string;
  first_name: string;
  last_name: string;
  bio: string;
  job: string;
  profile_photo: string;
  projects: Project[];
  educations: Education[];
  languages: Skill[];
  interests: Interest[];
  location: string;
  onboarded: boolean;
  following: number[];
  current_level: CareerLevel;
  looking_for: CareerLevel[];
  user_answers: UserAnswer[];
  work_experiences: WorkExperience[];
}
