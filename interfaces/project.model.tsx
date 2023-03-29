import { Tag } from "./tag.model";
import { Skill } from "./language.model";

export interface Project {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  description: string;
  languages: Skill[];
  image: string;
}
