import { Project } from "./project.model";

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  bio: string;
  job: string;
  profile_photo: string;
  projects: Project[];
}
