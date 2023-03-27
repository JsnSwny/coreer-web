import { Tag } from "./tag.model";

export interface Project {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  description: string;
  tags: Tag[];
}
