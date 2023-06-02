import { Tag } from "./tag.model";
import { Skill } from "./language.model";
import { Profile } from "./profile.model";

export interface ProjectRequest {
  title: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  languages?: Skill[];
  image?: File | null;
  video?: File | null;
  user: number;
}

export interface Project {
  id: number;
  title: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  languages?: Skill[];
  image?: string | null;
  video?: string | null;
  user: Profile;
}
