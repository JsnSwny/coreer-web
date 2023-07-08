import { Message } from "./message.model";
import { Profile } from "./profile.model";

export interface Conversation {
	id: number;
	name: string;
	other_user: Profile;
	last_message: Message;
}

export interface Like {
	id: number;
	following: Profile;
	follower: Profile;
	followed_on: Date;
}
