import { Skill } from "./language.model";
import { Profile } from "./profile.model";

export interface ProjectRequest {
	title: string;
	start_date?: string | undefined;
	end_date?: string | undefined;
	description?: string | undefined;
	languages_id?: number[];
	image?: File | null;
	video?: File | null;
	user_id: number;
	content?: string | undefined;
	repo_link?: string;
	project_link?: string;
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
	content: string;
	repo_link?: string;
	project_link?: string;
	images: string[];
}
