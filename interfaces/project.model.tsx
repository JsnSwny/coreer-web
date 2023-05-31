import { Tag } from "./tag.model";
import { Skill } from "./language.model";

export interface Project {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  languages: Skill[];
  image: string;
  video: File;
}
