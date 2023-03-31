export interface School {
	id: number;
	logo: string;
	name: string;
	country: string;
}

export interface Education {
	id: number;
	school: School;
	degree: string;
	start_date: Date;
	end_date: Date;
}